import { ReactNode } from "react";
import SignOutButton from "../SignOutButton";
import { useAppSelector } from "store/hooks";
import NavigationButtons from "./navigation/NavigationButtons";
import UserInfo from "./user_info/UserInfo";

export default function Aside(): ReactNode {
  const isAuth: boolean = useAppSelector((state) => state.auth.isAuth);
  
  if (isAuth) {
    return (
      <aside className="flex flex-col w-64 min-w-[250px] bg-grey-main py-10 px-5">
        <UserInfo />
        <NavigationButtons />
        <section className="mb-0 mt-auto">
          <SignOutButton />
        </section>
      </aside>
    );
  }
}
