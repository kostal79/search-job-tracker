import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const location = useLocation();
  if (!isAuth) {
    return <Navigate to="/" replace />;
  } else {
    return children;
  }
}
