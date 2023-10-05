import axios from "axios";
import { SERVER_URL, activeStatuses, finishedStatuses } from "../constants";
import { EditableValuesType, INoteParams, INotes } from "../types/types";



interface IDeleteRequest {
  message: string;
}

export async function getAllNotes(
  params: INoteParams
): Promise<INotes | undefined> {
  try {
    let statusQuery = null;
    if (params.status === "active") {
      statusQuery = { $in: activeStatuses };
    } else if (params.status === "finished") {
      statusQuery = { $in: finishedStatuses };
    } else {
      statusQuery = null;
    }
    let dateQuery = null;
    if (params.time_from && params.time_to) {
      dateQuery = { $gte: params.time_from, $lt: params.time_to };
    }
    const notes = await axios.get(`${SERVER_URL}/api/notes/all`, {
      withCredentials: true,
      params: {
        status: statusQuery,
        page: params.page,
        sort: params.sort,
        order_increasing: params.order_increasing,
        limit: params.limit,
        created_at: dateQuery,
        search: params.search,
      },
    });
    return notes.data;
  } catch (err) {
    if (err instanceof Error) console.error(err.message);
    else console.error("Unknown error");
  }
}

export async function getActiveNotes(): Promise<INotes[] | undefined> {
  try {
    const response = await axios.get(`${SERVER_URL}/api/users/notes`, {
      withCredentials: true,
    });
    const activeNotes: Array<INotes> = response.data.notes.filter(
      (note: INotes) => activeStatuses.includes(note.status)
    );
    return activeNotes;
  } catch (err) {
    if (err instanceof Error) console.error(err.message);
    else console.error("Unknown error");
  }
}

export async function createNote(data: EditableValuesType): Promise<INotes | undefined> {
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
