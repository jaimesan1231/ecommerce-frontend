import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useUserStore from "../store/userStore";
import Preloader from "./Preloader/Preloader";

const ProtectedRoute = () => {
  const location = useLocation();
  const user = useUserStore((state) => state.user);
  const token = localStorage.getItem("token");

  return token ? (
    user ? (
      <Outlet />
    ) : (
      <Preloader />
    )
  ) : (
    <Navigate to="/signin" state={{ from: location.pathname }} />
  );
};

export default ProtectedRoute;
