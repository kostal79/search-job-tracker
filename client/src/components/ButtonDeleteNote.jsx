import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { removeNote } from "../services/notesApi";
import { deleteFromNotes } from "../redux/slices/noteSlice";
import { useDispatch } from "react-redux";

export default function ButtonDeleteNote({ noteId }) {
  const dispatch = useDispatch();

  const onDelete = async (noteId) => {
    await removeNote(noteId);
    dispatch(deleteFromNotes(noteId));
  };

  return (
    <button onClick={() => onDelete(noteId)}>
      <LuTrash2 className="text-grey-8a" />
    </button>
  );
}
