import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { lazy, ReactNode } from "react";
import Layout from "../layouts/Layout";
import PrivateRoute from "./PrivateRoute";

const DashboardLayout = lazy(() => import("../layouts/DashboardLayout"));
const Home = lazy(() => import("../pages/Home"));
const Chart = lazy(() => import("../pages/Chart"));

export default function AppRoutes(): ReactNode {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="dashboard/:status"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Chart />} />
        </Route>
        <Route path="*" element={<p>404</p>} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}
