import React from "react";
import { LuList } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import useDefaultTime from "../hooks/useDefaultTime";

export default function ButtonDataActive({ status }) {
  const [time_from, time_to] = useDefaultTime();

  return (
    <NavLink
      to={`/dashboard?status=active&time_from=${time_from}&time_to=${time_to}`}
      className={
        status === "active"
          ? "px-4 py-2.5 bg-white rounded-md"
          : "px-4 py-2.5 rounded-md hover:bg-white"
      }
    >
      <span className="flex text-grey-8a items-center gap-6">
        <LuList className="w-5 h-5" />
        Active
      </span>
    </NavLink>
  );
}
