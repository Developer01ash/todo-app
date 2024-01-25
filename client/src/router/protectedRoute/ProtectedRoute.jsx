import Cookies from "js-cookie";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const token = Cookies.get("session-tid");

  if (!token || token === undefined) {
    return <Navigate to={"/"} />;
  }
  return <Outlet />;
};
