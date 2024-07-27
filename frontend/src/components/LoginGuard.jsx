import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../routes";
import { useAuth } from "../hooks/AuthProvider";
import { useEffect } from "react";

/**
 * Route guard component: protects every inner component, redirects to login page when user is not authorized (token not set)
 * @returns
 */
const LoginGuard = () => {
  const auth = useAuth();
  useEffect(() => {
    console.debug("auth token changed", auth.token);
  }, [auth.token]);
  console.debug(auth.token === undefined);
  return auth.token ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />;
};

export default LoginGuard;
