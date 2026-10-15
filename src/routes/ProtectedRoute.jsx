import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthStore from "../stores/authStore";

/**
 * Blocks access if the user is not authenticated.
 * Optionally restricts to specific userTypes.
 */
const ProtectedRoute = ({ allowedUserTypes }) => {
  const location = useLocation();
  const { isAuthenticated, token, userType } = useAuthStore();

  // Not authenticated → redirect to login, preserving intended path
  if (!isAuthenticated || !token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  // If specific user types allowed, enforce
  if (allowedUserTypes && !allowedUserTypes.includes(userType)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;