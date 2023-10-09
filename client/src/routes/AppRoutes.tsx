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
const VacanciesAll = lazy(() => import("../pages/VacanciesAll"));
const VacanciesActive = lazy(() => import("../pages/VacanciesActive"))
const VacanciesFinished = lazy(() => import("../pages/VacanciesFinished"))

export default function AppRoutes(): ReactNode {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<VacanciesAll />} />
          <Route path="active" element={<VacanciesActive />}/>
          <Route path="finished" element={<VacanciesFinished />}/>
          <Route path="analitics" element=""/>
        </Route>
        <Route path="*" element={<p>404</p>} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}
