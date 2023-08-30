import React, { useState } from "react";
import { LuPencil } from "react-icons/lu";
import Dialog from "./Dialog";
import FormAddNote from "./FormAddNote";
import { useDispatch } from "react-redux";
import { editNote } from "../redux/slices/noteSlice";
import { updateNote } from "../services/notesApi";

export default function ButtonEdit({ note }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSubmit = async (values) => {
    const noteId = values._id;
    await updateNote(noteId, values);
    dispatch(editNote(values));
    alert(`Note id=${noteId} was changed`);
    onClose();
  };

  const initialValues = note;

  return (
    <>
      <button onClick={onOpen}>
        <LuPencil className="text-grey-8a" />
      </button>
      <Dialog open={open} onClose={onClose}>
        <FormAddNote initialValues={initialValues} onSubmit={onSubmit} />
      </Dialog>
    </>
  );
}
