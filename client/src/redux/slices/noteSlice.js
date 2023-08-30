import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    notes: [],
    activePage: 1,
}

export const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setNotes: (state, action) => {
            state.notes = action.payload
        },
        addNote: (state, action) => {
            state.notes.push(action.payload);
        },
        deleteFromNotes: (state, action) => {
            state.notes = state.notes.filter(note => note._id !== action.payload)
        },
        editNote: (state, action) => {
            const noteId = action.payload._id;
            for (let note of state.notes) {
                if (note._id === noteId) {
                    for (let [key, value] of Object.entries(action.payload)){
                        note[key] = value
                    }
                }
            }
        },
        setActivePage: (state, action) => {
            state.activePage = action.payload;
        }
    }
})

export const { setNotes, addNote, deleteFromNotes, editNote, setActivePage } = noteSlice.actions

export default noteSlice.reducer