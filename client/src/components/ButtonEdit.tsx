import React, { ReactNode, useState } from "react";
import { LuPencil } from "react-icons/lu";
import Dialog from "./Dialog";
import FormAddNote from "./FormAddNote";
import { editNote } from "../redux/slices/noteSlice";
import { updateNote } from "../services/notesApi";
import { EditableValuesType, INotes } from "../types/types";
import { useAppDispatch } from "../redux/hooks";

interface ButtonEdit {
  note: INotes;
}

export default function ButtonEdit({ note }: ButtonEdit): ReactNode {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onOpen: () => void = () => {
    setIsOpen(true);
  };

  const onClose: () => void = () => {
    setIsOpen(false);
  };

  const onSubmit = async (values: EditableValuesType) => {
    const noteId = note._id;
    await updateNote(noteId, values);
    dispatch(editNote({_id: noteId, ...values}));
    alert(`Note id=${noteId} was changed`);
    onClose();
  };

  const initialValues: EditableValuesType = {...note}

  return (
    <>
      <button onClick={onOpen}>
        <LuPencil className="text-grey-8a" />
      </button>
      <Dialog isOpen={isOpen} onClose={onClose}>
        <FormAddNote initialValues={initialValues} onSubmit={onSubmit} />
      </Dialog>
    </>
  );
}
