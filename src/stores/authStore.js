import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import api from "../services/api";

const useAuthStore = create(
  persist(
    (set, get) => ({
      // ==================================================
      // AUTH STATE
      // ==================================================

      user: null,
      token: null,
      tokenType: "Bearer",

      isAuthenticated: false,

      // super_admin
      // organization_owner
      // organization_user
      // accountant
      userType: null,

      selectedOrganisation: null,

      loading: false,
      error: null,

      // ==================================================
      // LOGIN
      // ==================================================

      login: async (credentials) => {
        set({
          loading: true,
          error: null,
        });

        try {
          const response = await api.post("/auth/login", credentials);

          if (!response.data?.success) {
            throw new Error(response.data?.message || "Login failed.");
          }

          const data = response.data.data;

          const user = data.user;
          const token = data.token;
          const tokenType = data.token_type || "Bearer";

          // ----------------------------------------------
          // Determine user type
          // ----------------------------------------------

          let userType = null;

          // Website Owner / Super Admin
          if (user?.is_super_admin === true) {
            userType = "super_admin";
          }

          // Accountant - keep this ready for later
          else if (user?.roles?.some((role) => role.slug === "accountant")) {
            userType = "accountant";
          }

          // Organisation user / owner
          else if (user?.organisations?.length > 0) {
            const isOwner = user.roles?.some((role) => role.slug === "owner");

            userType = isOwner ? "organization_owner" : "organization_user";
          }

          // ----------------------------------------------
          // Selected organisation
          // ----------------------------------------------

          const selectedOrganisation =
            user?.organisations?.length > 0 ? user.organisations[0] : null;

          // ----------------------------------------------
          // Save auth state
          // ----------------------------------------------

          set({
            user,
            token,
            tokenType,

            isAuthenticated: true,

            userType,

            selectedOrganisation,

            loading: false,
            error: null,
          });

          return {
            success: true,
            user,
            token,
            tokenType,
            userType,
            selectedOrganisation,
          };
        } catch (error) {
          const message =
            error.response?.data?.message ||
            error.message ||
            "Unable to login.";

          set({
            loading: false,
            error: message,
            isAuthenticated: false,
          });

          return {
            success: false,
            message,
          };
        }
      },

      // ==================================================
      // LOGOUT
      // ==================================================

      logout: async () => {
        try {
          // If your Laravel API has logout:
          // await api.post("/logout");
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          set({
            user: null,
            token: null,
            tokenType: "Bearer",

            isAuthenticated: false,

            userType: null,

            selectedOrganisation: null,

            loading: false,
            error: null,
          });
        }
      },

      // ==================================================
      // CURRENT USER
      // ==================================================

      fetchCurrentUser: async () => {
        try {
          const response = await api.get("/auth/me");

          if (!response.data?.success) {
            throw new Error(
              response.data?.message || "Unable to retrieve user.",
            );
          }

          const user = response.data.data.user;

          // ================================================
          // DETERMINE USER TYPE
          // ================================================

          let userType = null;

          // Super Admin / Website Owner
          if (user?.is_super_admin === true) {
            userType = "super_admin";
          }

          // Accountant - ready for future
          else if (user?.roles?.some((role) => role.slug === "accountant")) {
            userType = "accountant";
          }

          // Organisation user
          else if (user?.organisations?.length > 0) {
            const isOwner = user.roles?.some((role) => role.slug === "owner");

            userType = isOwner ? "organization_owner" : "organization_user";
          }

          // ================================================
          // ORGANISATION
          // ================================================

          const selectedOrganisation =
            user?.organisations?.length > 0 ? user.organisations[0] : null;

          // ================================================
          // UPDATE ZUSTAND
          // ================================================

          set({
            user,

            isAuthenticated: true,

            userType,

            selectedOrganisation,

            error: null,
          });

          return {
            success: true,
            user,
            userType,
            selectedOrganisation,
          };
        } catch (error) {
          console.error("Fetch current user error:", error);

          // Token is no longer valid
          set({
            user: null,
            token: null,
            tokenType: "Bearer",

            isAuthenticated: false,

            userType: null,

            selectedOrganisation: null,

            error: error.response?.data?.message || "Session expired.",
          });

          return {
            success: false,
            message: error.response?.data?.message || "Session expired.",
          };
        }
      },

      // ==================================================
      // UPDATE USER
      // ==================================================

      updateUser: (userData) => {
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                ...userData,
              }
            : userData,
        }));
      },

      // ==================================================
      // CLEAR ERROR
      // ==================================================

      clearError: () => {
        set({
          error: null,
        });
      },

      // ==================================================
      // ORGANISATION
      // ==================================================

      setSelectedOrganisation: (organisation) => {
        set({
          selectedOrganisation: organisation,
        });
      },

      // ==================================================
      // ROLE CHECK
      // ==================================================

      hasRole: (role) => {
        const user = get().user;

        if (!user) {
          return false;
        }

        return (
          user.roles?.some(
            (item) => item.slug === role && item.is_active !== false,
          ) || false
        );
      },

      // ==================================================
      // PERMISSION CHECK
      // ==================================================

      hasPermission: (permission) => {
        const user = get().user;

        if (!user) {
          return false;
        }

        // Super admin can access everything
        if (user.is_super_admin === true) {
          return true;
        }

        const permissions =
          user.roles?.flatMap((role) => role.permissions || []) || [];

        return permissions.some(
          (item) => item.slug === permission && item.is_active === true,
        );
      },
    }),

    {
      name: "taxpilot-auth",

      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        user: state.user,
        token: state.token,
        tokenType: state.tokenType,
        isAuthenticated: state.isAuthenticated,
        userType: state.userType,
        selectedOrganisation: state.selectedOrganisation,
      }),
    },
  ),
);

export default useAuthStore;
