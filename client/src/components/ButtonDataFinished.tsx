import React, { ReactNode } from "react";
import { LuListX } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import useDefaultTime from "../hooks/useDefaultTime";

interface ButtonDataFinishedProps {
  status: string | null;
}

export default function ButtonDataFinished({
  status,
}: ButtonDataFinishedProps): ReactNode {
  const { TimestampFrom, TimestampTo } = useDefaultTime();

  return (
    <NavLink
      to={`/dashboard?status=finished&time_from=${TimestampFrom}&time_to=${TimestampTo}`}
      className={
        status === "finished"
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
