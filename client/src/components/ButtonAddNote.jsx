import React from "react";

export default function ButtonAddNote({onClick}) {
  return (
    <button className="bg-blue-main px-5 text-base text-white font-normal h-11 rounded-xl" onClick={onClick}>
      Add new note
    </button>
  );
}
