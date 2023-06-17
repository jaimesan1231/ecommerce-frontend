import React, { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const ProtectedRoute = () => {
  const location = useLocation();
  const { user } = useContext(AppContext);
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location.pathname }} />
  );
};

export default ProtectedRoute;
