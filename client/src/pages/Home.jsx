import React from "react";
import { useSelector } from "react-redux";
import SignInButton from "../components/SignInButton";
import {  getAllNotes } from "../services/notesApi";

export default function Home() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const userName = useSelector((state) => state.auth.user.userName);

  if (!isAuth) {
    return (
      <div className="flex flex-col w-[100%] h-[100vh] p-8 justify-center items-center bg-slate-700">
        <p className="text-center mb-8">Hi! for using search tracker you need to sign in</p>
          <SignInButton />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col w-[100%] h-[100vh] p-8 justify-center">
      <p className="text-center mb-8">Wellcome {userName}!</p>
      <button onClick={() => getAllNotes("64e35e5aa74ee6465ef8dc17")}>click</button>
    </div>
    )
  }
}
