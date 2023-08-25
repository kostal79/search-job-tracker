import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import React, { lazy } from "react";
import Layout from "../Layout";
import PrivateRoute from "./PrivateRoute";
import { dashboardLoader } from "../pages/Dashboard";
import { useSelector } from "react-redux";
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Home = lazy(() => import("../pages/Home"));

export default function AppRoutes() {
  const userId = useSelector((state) => state.auth.user.userId);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
          loader={() => dashboardLoader(userId)}
        />
        <Route path="*" element={<p>404</p>} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}
