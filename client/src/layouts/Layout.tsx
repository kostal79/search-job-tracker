import React, { ReactNode, Suspense } from "react";
import { Outlet } from "react-router-dom";
import Aside from "../components/Aside";

export default function Layout(): ReactNode {
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
