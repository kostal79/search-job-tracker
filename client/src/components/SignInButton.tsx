import React, { ReactNode } from "react";
import { SERVER_URL } from "../constants";
import { FcGoogle } from "react-icons/fc";

export default function SignInButton(): ReactNode {
  const logIn: () => void = () =>
    (window.location.href = `${SERVER_URL}/api/auth/google`);
  return (
    <button
      className="p-4 border-solid border border-gray-500 rounded-md max-w-xs"
      onClick={logIn}
    >
      <span className="flex items-center gap-x-6">
        <FcGoogle />
        Continue with Google
      </span>
    </button>
  );
}
