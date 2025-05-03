import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";

export default function PublicRoute() {
  const [auth] = useAuth();
  const location = useLocation();

  // If user is already logged in, redirect to home
  if (auth?.token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
} 