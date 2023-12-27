import { CHART_URL } from "@/constants";
import { ReactNode } from "react";
import { LuListX } from "react-icons/lu";
import { NavLink } from "react-router-dom";

export default function ButtonDataFinished(): ReactNode {
  return (
    <NavLink
      to={`${CHART_URL}/finished`}
      className={({ isActive }) =>
        isActive
          ? "px-4 py-2.5 bg-white rounded-md"
          : "px-4 py-2.5 rounded-md  hover:bg-white"
      }
    >
      <span className="flex text-grey-8a items-center gap-6">
        <LuListX className="w-5 h-5" />
        Finished
      </span>
    </NavLink>
  );
}
