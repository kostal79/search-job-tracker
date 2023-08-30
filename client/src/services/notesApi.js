import axios from "axios"
import { SERVER_URL, activeStatuses, finishedStatuses } from "../constants";

export async function getAllNotes() {
    try {
        const response = await axios.get(`${SERVER_URL}/api/users/notes`, { withCredentials: true });
        return response.data.notes;
    } catch (err) {
        console.error(err.message)
    }
}

export async function getFinishedNotes() {
    try {
        const response = await axios.get(`${SERVER_URL}/api/users/notes`, { withCredentials: true });
        const finishedNotes = response.data.notes.filter(note => finishedStatuses.includes(note.status));
        return finishedNotes
    } catch (err) {
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