import React from "react";
import { useSelector } from "react-redux";
import SignOutButton from "./SignOutButton";
import ButtonSettings from "./ButtonSettings";
import ButtonData from "./ButtonData";
import ButtonDataFinished from "./ButtonDataFinished";
import ButtonDataActive from "./ButtonDataActive";
import ButtonAnalitics from "./ButtonAnalitics";

export default function Aside() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user);
  if (isAuth) {
    return (
      <aside className="flex flex-col w-64 min-w-[250px] bg-grey-main py-10 px-5">
        <section className="flex justify-between items-center">
          <div className="flex gap-2.5 items-center">
            <img
              id="user"
              className=" w-10 h-10 rounded-full"
              src={user.userLogo}
              alt="user avatar"
            />
            <div className="flex flex-col gap-1">
              <p className="text-xs text-grey-mid font-light">Welcome back,</p>
              <p className="text-lg text-grey-dark font-medium">{user.userName}</p>
            </div>
          </div>
          <ButtonSettings />
        </section>
      <nav className="flex flex-col gap-2 mt-10">
        <ButtonData />
        <ButtonDataActive />
        <ButtonDataFinished />
        <ButtonAnalitics />

      </nav>
        <section className="mb-0 mt-auto">
          <SignOutButton />
        </section>
      </aside>
    );
  }
}