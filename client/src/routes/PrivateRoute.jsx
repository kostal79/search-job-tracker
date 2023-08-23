import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, useLocation } from "react-router-dom";

export default function PrivateRoute({children}) {
  const isAuth = useSelector((state) => state.isAuth);
  const location = useLocation();
    console.log(children)
    if (!isAuth) {
        return <Navigate to="/login" state={{from: location.pathname}}/>
    }
  return (
    children
  );
}
