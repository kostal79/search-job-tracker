import React from "react";
import useTimeHandler from "../hooks/useTimeHandler";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";


export default function DateSwicher() {
  const [date, increaseMonth, decreaseMonth] = useTimeHandler();

  return (
    <section className="flex gap-2 items-center text-grey-8a border-solid border rounded-lg pl-5 pr-5" >
      <button onClick={decreaseMonth}>
        <AiOutlineLeft />
      </button>
      <p className="w-[125px] text-center">{date}</p>
      <button onClick={increaseMonth}>
        <AiOutlineRight />
      </button>
    </section>
  );
}
