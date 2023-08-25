import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Aside from "./components/Aside";
import { useSelector } from "react-redux";

export default function Layout() {
  const isAuth = useSelector(state => state.auth.isAuth);
  return (
    <>
      <main className="flex p-1.5 min-w-[320px]">
      <Aside />
        <Suspense fallback={<p>Loading...</p>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
