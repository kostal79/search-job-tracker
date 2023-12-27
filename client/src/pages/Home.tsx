import React, { ReactNode } from "react";
import SignInButton from "../components/SignInButton";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

export default function Home(): ReactNode {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  if (!isAuth) {
    return (
      <div className="flex flex-col w-[100%] h-[100vh] p-8 justify-center items-center bg-slate-700">
        <p className="text-center mb-8">
          Hi! for using search tracker you need to sign in
        </p>
        <SignInButton />
      </div>
    );
  } else {
    return <Navigate to="/chart/all" />;
  }
}
