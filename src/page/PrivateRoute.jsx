import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const {
    authUser: { token },
  } = useAuth();
  return token ? (
    children
  ) : (
    <Navigate to={"/"} state={{ from: location?.pathname }} replace />
  );
};

export default PrivateRoute;
