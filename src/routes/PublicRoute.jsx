import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../stores/authStore";

/**
 * Redirects already-authenticated users away from login/register.
 */
const PublicRoute = () => {
  const { isAuthenticated, token, userType } = useAuthStore();

  if (isAuthenticated && token) {
    // Send to the correct dashboard based on user type
    const redirectMap = {
      super_admin: "/admin",
      accountant: "/accountant",
      organization_owner: "/organization",
      organization_user: "/organization",
    };

    return <Navigate to={redirectMap[userType] || "/"} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;