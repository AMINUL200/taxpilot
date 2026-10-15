import axios from "axios";
import { navigateTo } from "../utils/navigation";
import useAuthStore from "../stores/authStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// ======================================================
// REQUEST INTERCEPTOR
// ======================================================

api.interceptors.request.use(
  (config) => {
    // Read directly from Zustand (single source of truth)
    const token = useAuthStore.getState().token;
    const tokenType = useAuthStore.getState().tokenType || "Bearer";

    if (token) {
      config.headers.Authorization = `${tokenType} ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ======================================================
// RESPONSE INTERCEPTOR
// ======================================================

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response) {
      const { status } = error.response;
      const url = error.config?.url || "";

      // Skip auth endpoints — let the caller handle those
      const isAuthEndpoint =
        url.includes("/auth/login") || url.includes("/auth/me");

      if (status === 401 && !isAuthEndpoint) {
        // Clear the store
        useAuthStore.getState().logout();

        // Only redirect if we're not already on an auth page
        const path = window.location.pathname;
        const isAuthPage =
          path === "/login" ||
          path === "/register" ||
          path === "/verify-email";

        if (!isAuthPage) {
          navigateTo("/login?session=expired", { replace: true });
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;