import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../../stores/authStore";
import TaxPilotLoader from "./PageLoader";
import { setNavigate } from "../../utils/navigation";

const AuthGate = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { token, isAuthenticated, fetchCurrentUser } = useAuthStore();
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  /* =========================================================
     WIRE UP NAVIGATION BRIDGE
  ========================================================= */
  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  /* =========================================================
     VERIFY SESSION ON MOUNT
  ========================================================= */
  useEffect(() => {
    let isMounted = true;

    const bootstrap = async () => {
      // No token → nothing to verify
      if (!token) {
        if (isMounted) setIsBootstrapping(false);
        return;
      }

      // Fetch fresh user data
      const result = await fetchCurrentUser();

      if (!isMounted) return;

      if (!result.success) {
        // Session invalid — clean up
        useAuthStore.getState().logout();
      }

      setIsBootstrapping(false);
    };

    bootstrap();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* =========================================================
     LOADING SCREEN
  ========================================================= */
  if (isBootstrapping && token) {
    return <TaxPilotLoader onComplete={() => {}} />;
  }

  return children;
};

export default AuthGate;