import React from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import useTimeHandler from "../hooks/useTimeHandler";

export default function Filters() {
  const [date, increaseMonth, decreaseMonth] = useTimeHandler();

  return (
    <div className="flex justify-end mt-7">
      <section className="flex gap-2 items-center text-grey-8a">
        <button onClick={decreaseMonth}>
          <AiOutlineLeft />
        </button>
        <p className="w-[125px] text-center">{date}</p>
        <button onClick={increaseMonth}>
          <AiOutlineRight />
        </button>
      </section>
    </div>
  );
}
