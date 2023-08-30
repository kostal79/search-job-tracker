import React from "react";

export default function ButtonAddNote({onClick}) {
  return (
    <button
      className="bg-blue-main px-5 py-2 text-base text-white font-normal h-full rounded-xl"
      onClick={onClick}
    >
      Add new note
    </button>
  );
}
