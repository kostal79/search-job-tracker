import axios from "axios"
import { SERVER_URL } from "../constants";

export async function getAllNotes(userId) {
    try {
        const response = await axios.get(`${SERVER_URL}/api/users/${userId}`, { withCredentials: true });
        return response.data.notes;
    }catch(err) {
            console.error(err.message)
    }
}

export async function createNote(data) {
    const noteData = await axios.post(`${SERVER_URL}/api/notes/create`, data);
    const noteId = noteData.data._id;
    const response = await axios.put(`${SERVER_URL}/api/users/addNote`, { noteId: noteId }, { withCredentials: true });
    return response.data;
}

export async function removeNote(noteId) {
    await axios.delete(`${SERVER_URL}/api/notes/${noteId}`);
    const response = await axios.put(`${SERVER_URL}/api/users/removeNote`, { noteId: noteId }, { withCredentials: true });
    console.log(response.data);
}

export async function updateNote(noteId, noteData) {
    const response = await axios.put(`${SERVER_URL}/api/notes/${noteId}`, noteData)
    console.log(response.data)
}