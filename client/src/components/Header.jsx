import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { AiOutlineMenu } from "react-icons/ai";
import { Tooltip } from "react-tooltip";
import { useLogout } from "../hooks/useLogout";
import { SERVER_URL } from "../constants";

export default function Header() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user);
  const logOut = useLogout();
  const logIn = () => window.location.href = `${SERVER_URL}/api/auth/google`;

  return (
    <header>
      <div className="py-2 px-4 flex flex-row gap-3 justify-between">
        <AiOutlineMenu className="w-7 h-7" />
        <div className="w-7 h-7">
          {!isAuth && <FaUserCircle id="guest" className="w-full h-full" />}
          {isAuth && (
            <img
              id="user"
              className="w-full h-full rounded-full"
              src={user.userLogo}
              alt="user avatar"
            />
          )}
          <Tooltip anchorSelect="#guest" clickable>
          <div className="flex flex-col gap-3">
              <p>{`Hi Guest!`}</p>
              <button
                className="p-1 border-solid border border-gray-500 rounded-md"
                onClick={logIn}
              >
                Sing in with Google
              </button>
            </div>
          </Tooltip>
          <Tooltip anchorSelect="#user" clickable>
            <div className="flex flex-col gap-3">
              <p>{`Hi ${user.userName}!`}</p>
              <button
                className="p-1 border-solid border border-gray-500 rounded-md"
                onClick={logOut}
              >
                Sing out
              </button>
            </div>
          </Tooltip>
        </div>
      </div>
    </header>
  );
}
