const env = import.meta.env;
import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "../zustand/useAuth";
import axios from "axios";
axios.defaults.baseURL = env.VITE_SERVER_URL;

const AuthGuard = () => {
  const location = useLocation();
  console.log("AuthGuard rendered");
  const [isLogin, setIsLogin] = useState(null);
  const user = useAuth(); // Placeholder for actual auth logic

  const checkToken = async (token) => {
    try {
      await axios.post("/auth/verify", { token });
      setIsLogin(true);
    } catch (error) {
      setIsLogin(false);
      console.error("Token validation failed:", error);
    }
  };

  useEffect(() => {
    if (user.user) {
      checkToken(user.user.token);
    } else {
      setIsLogin(false);
    }
  }, [user]);

  if (isLogin === null) {
    return (
      <div className="bg-gray-200 h-screen flex items-center justify-center animate__animated animate__fadeIn">
        <Loader2 className="animate-spin text-indigo-600 size-16" />
      </div>
    );
  }

  if (isLogin === false && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  if (isLogin === true && location.pathname === "/login") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
