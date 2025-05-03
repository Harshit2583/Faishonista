import { useState, useEffect } from "react";
// import { useAuth } from "../../context/auth";
import { useAuth } from "../../context/auth";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();
  const location = useLocation();

  useEffect(() => {
    const authCheck = async () => {
      try {
        if (auth?.token) {
          const res = await axios.get("/api/v1/auth/user-auth");
          setOk(res.data.ok);
        } else {
          setOk(false);
        }
      } catch (error) {
        setOk(false);
      } finally {
        setLoading(false);
      }
    };
    authCheck();
  }, [auth?.token]);

  if (loading) {
    return <Spinner />;
  }

  if (!ok) {
    // Redirect to login page with the return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}