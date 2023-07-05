import React, { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import useUserStore from "../store/userStore";

const ProtectedRoute = () => {
  const location = useLocation();
  const user = useUserStore((state) => state.user);
  const token = localStorage.getItem("token");
  return token ? (
    user && <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location.pathname }} />
  );
};

export default ProtectedRoute;
