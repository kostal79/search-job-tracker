import React from "react";
import { LuList } from "react-icons/lu";
import { NavLink } from "react-router-dom";

export default function ButtonDataActive() {
  return (
    <NavLink to="/dashboard_active" className={({isActive}) => 
      isActive ? "px-4 py-2.5 bg-white rounded-md" : "px-4 py-2.5 rounded-md"} >
      <span className="flex text-grey-8a items-center gap-6">
        <LuList className="w-5 h-5" />
        Active
      </span>
    </NavLink>
  );
}
