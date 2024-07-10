import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

/**
 * Route guard component: protects every inner component, redirects to login page when user is not authorized (token not set)
 * @returns
 */
const LoginGuard = () => {
  const user = useAuth();
  return !user.token ? <Navigate to="/login" /> : <Outlet />;
};

export default LoginGuard;
