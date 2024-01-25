import Cookies from "js-cookie";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
  const token = Cookies.get("session-tid");

  if (token) {
    return <Navigate to={"/dashboard"} />;
  }
  return <Outlet />;
};
