import axios from "axios";
import { SERVER_URL, activeStatuses } from "../constants";
import { EditableValuesType, INotes } from "../types/types";

interface IDeleteRequest {
  message: string;
}

export async function getAllNotes(): Promise<INotes[]> {
  const notes = await axios.get(`${SERVER_URL}/api/notes/all`, {
    withCredentials: true,
  });
  console.log("NOTES: ", notes);
  return notes.data.notes;
}

export async function getActiveNotes(): Promise<INotes[]> {
  const notes = await axios.get(`${SERVER_URL}/api/notes/active`)
  return notes.data.notes;
}

export async function createNote(
  data: EditableValuesType
): Promise<INotes | undefined> {
  try {
    const noteData = await axios.post(`${SERVER_URL}/api/notes/create`, data);
    const noteId = noteData.data._id;
    await axios.put(
      `${SERVER_URL}/api/users/addNote`,
      { noteId: noteId },
      { withCredentials: true }
    );
    return noteData.data;
  } catch (err) {
    if (err instanceof Error) console.error(err.message);
    else console.error("Unknown error");
  }
}

export async function removeNote(
  noteId: INotes["_id"]
): Promise<IDeleteRequest | undefined> {
  try {
    await axios.delete(`${SERVER_URL}/api/notes/${noteId}`);
    const response = await axios.put(
      `${SERVER_URL}/api/users/removeNote`,
      { noteId: noteId },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    if (err instanceof Error) console.error(err.message);
    else console.error("Unknown error");
  }
}

export async function updateNote(
  noteId: INotes["_id"],
  noteData: EditableValuesType
): Promise<INotes | undefined> {
  try {
    const response = await axios.put(
      `${SERVER_URL}/api/notes/${noteId}`,
      noteData
    );
    return response.data;
  } catch (err) {
    if (err instanceof Error) console.error(err.message);
    else console.error("Unknown error");
  }
}
