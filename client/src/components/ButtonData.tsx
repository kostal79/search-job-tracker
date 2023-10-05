import React, { ReactNode } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import useDefaultTime from "../hooks/useDefaultTime";

interface ButtonDataProps {
  status: string | null;
}

export default function ButtonData({status} : ButtonDataProps) : ReactNode {
  const {TimestampFrom, TimestampTo} = useDefaultTime();
  return (
    <NavLink
      to={`/dashboard?time_from=${TimestampFrom}&time_to=${TimestampTo}`}
      className={({isActive}) => 
        isActive && !status ? "px-4 py-2.5 bg-white rounded-md" : "px-4 py-2.5 rounded-md  hover:bg-white"
      }
    >
      <span className="flex text-grey-8a items-center gap-6">
        <LuLayoutDashboard className="w-5 h-5" />
        All vacancies
      </span>
    </NavLink>
  );
}
