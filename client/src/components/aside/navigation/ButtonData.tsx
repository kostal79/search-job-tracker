import { CHART_URL } from "@/constants";
import { ReactNode } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { NavLink } from "react-router-dom";

export default function ButtonData(): ReactNode {
  return (
    <NavLink
      to={`${CHART_URL}/all`}
      className={({ isActive }) =>
        isActive
          ? "px-4 py-2.5 bg-white rounded-md"
          : "px-4 py-2.5 rounded-md  hover:bg-white"
      }
      end
    >
      <span className="flex text-grey-8a items-center gap-6">
        <LuLayoutDashboard className="w-5 h-5" />
        All vacancies
      </span>
    </NavLink>
  );
};
