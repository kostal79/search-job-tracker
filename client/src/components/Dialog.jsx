import React from "react";
import { GrFormClose } from "react-icons/gr";

export default function Dialog({ open, onClose, children }) {
  return (
    <dialog
      open={open}
      className="fixed w-full h-full bg-slate-500/[0.5]"
    >
      <div className="w-full h-full flex flex-col justify-center items-center">
        <header
          className="bg-white p-5 flex flex-col opacity-100 max-w-[60%] min-w-[320px]"
          style={{ opacity: "1" }}
        >
          <button className="mr-0 ml-auto rounded-md" onClick={onClose}>
            <GrFormClose className="w-7 h-7" />
          </button>
          {children}
        </header>
      </div>
    </dialog>
  );
}
