import React, { ReactNode } from "react";

interface ButtonAddNoteProps {
  onClick: () => void;
}
export default function ButtonAddNote({onClick}: ButtonAddNoteProps) : ReactNode {
  return (
    <button
      className="bg-blue-main px-5 py-2 text-base text-white font-normal h-full rounded-xl"
      onClick={onClick}
    >
      Add new note
    </button>
  );
}
