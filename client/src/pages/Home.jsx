import React from "react";
import { useSelector } from "react-redux";
import SignInButton from "../components/SignInButton";
import { Navigate } from "react-router-dom";

export default function Home() {
  const isAuth = useSelector((state) => state.auth.isAuth);

  if (!isAuth) {
    return (
      <div className="flex flex-col w-[100%] h-[100vh] p-8 justify-center items-center bg-slate-700">
        <p className="text-center mb-8">Hi! for using search tracker you need to sign in</p>
          <SignInButton />
      </div>
    );
  } else {
    return (
      <Navigate to="/dashboard" />
    )
  }
}
