import React, { ReactNode } from "react";
import { LuBarChart3 } from "react-icons/lu";
import { NavLink } from "react-router-dom";

export default function ButtonAnalitics() : ReactNode {
  return (
    <NavLink to="/analitics" className={({isActive}) => 
      isActive ? "px-4 py-2.5 bg-white rounded-md" : "px-4 py-2.5 rounded-md  hover:bg-white"} >
      <span className="flex text-grey-8a items-center gap-6">
        <LuBarChart3 className="w-5 h-5" />
        Analitics
      </span>
    </NavLink>
  );
}
