import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import React, { lazy } from "react";
import Layout from "../Layout";
import PrivateRoute from "./PrivateRoute";
const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Home = lazy(() => import("../pages/Home"));

export default function AppRoutes() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<p>404</p>} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}