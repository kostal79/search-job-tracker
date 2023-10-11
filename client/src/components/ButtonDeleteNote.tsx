import React, { ReactNode } from "react";
import { LuTrash2 } from "react-icons/lu";
import { removeNote } from "../services/notesApi";
import { deleteFromNotes } from "../store/slices/noteSlice";
import { INotes } from "../types/types";
import { useAppDispatch } from "../store/hooks";

interface ButtonDeleteNoteProps {
  noteId: INotes["_id"]
}

export default function ButtonDeleteNote({ noteId }: ButtonDeleteNoteProps): ReactNode {
  const dispatch = useAppDispatch();

  const onDelete = async () => {
    await removeNote(noteId);
    dispatch(deleteFromNotes(noteId));
  };

  return (
    <button onClick={onDelete}>
      <LuTrash2 className="text-grey-8a" />
    </button>
  );
}
