import React from "react";
import { useLogout } from "../hooks/useLogout";
import singoutSVG from "../assets/logout.svg";

export default function SignOutButton() {
  const logOut = useLogout();
  return (
    <div>
      <button className="px-4 py-2.5" onClick={logOut}>
        <span  className="flex text-grey-8a items-center gap-6">
          <img className="w-5 h-5" src={singoutSVG} alt="out" />
          Sing out
        </span>
      </button>
    </div>
  );
}
