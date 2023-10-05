import { ReactNode } from "react";
import { GrFormClose } from "react-icons/gr";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Dialog({ isOpen, onClose, children }: DialogProps) {
  return (
    <dialog
      open={isOpen}
      className="fixed w-full h-full top-0 left-0 bg-slate-500/[0.5]"
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
