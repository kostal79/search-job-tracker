import axios from "axios"
import { SERVER_URL, activeStatuses, finishedStatuses } from "../constants";

export async function getAllNotes(params) {
    try {
        let statusQuery = null;
        if (params.status === "active") {
            statusQuery = { $in: activeStatuses }
        } else if (params.status === "finished") {
            statusQuery = { $in: finishedStatuses }
        } else {
            statusQuery = null;
        }
        let dateQuery = null;
        if (params.time_from && params.time_to) {
            dateQuery = { $gte: params.time_from, $lt: params.time_to }
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
            }
        });
        return notes.data
    } catch {
        console.error(err.message)
    }
}


export async function getActiveNotes() {
    try {
        const response = await axios.get(`${SERVER_URL}/api/users/notes`, { withCredentials: true });
        const activeNotes = response.data.notes.filter(note => activeStatuses.includes(note.status));
        return activeNotes
    } catch (err) {
        console.error(err.message)
    }
}

export async function createNote(data) {
    try {
        const noteData = await axios.post(`${SERVER_URL}/api/notes/create`, data);
        const noteId = noteData.data._id;
        await axios.put(`${SERVER_URL}/api/users/addNote`, { noteId: noteId }, { withCredentials: true });
        return noteData.data
    } catch (error) {
        console.error(error)
    }
}

export async function removeNote(noteId) {
    await axios.delete(`${SERVER_URL}/api/notes/${noteId}`);
    const response = await axios.put(`${SERVER_URL}/api/users/removeNote`, { noteId: noteId }, { withCredentials: true });
    return response.data;
}

export async function updateNote(noteId, noteData) {
    const response = await axios.put(`${SERVER_URL}/api/notes/${noteId}`, noteData)
    return response.data;
}