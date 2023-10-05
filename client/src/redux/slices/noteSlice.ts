import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INoteParams, INotes } from "../../types/types";


interface NotesState {
  notes: INotes[];
  searchParams: INoteParams | null;
}

const initialState: NotesState = {
  notes: [],
  searchParams: null,
};

export const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<INotes[]>) => {
      state.notes = action.payload;
    },
    addNote: (state, action: PayloadAction<INotes>) => {
      state.notes.push(action.payload);
    },
    deleteFromNotes: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note._id !== action.payload);
    },
    editNote: (state, action: PayloadAction<Partial<INotes>>) => {
      const noteId = action.payload._id;
      for (let note of state.notes) {
        if (note._id === noteId) {
          for (let [key, value] of Object.entries(action.payload)) {
            (note as any)[key] = value;
          }
        }
      }
    },
    setSearch: (state, action: PayloadAction<INoteParams>) => {
      state.searchParams = action.payload;
    },
  },
});

export const { setNotes, addNote, deleteFromNotes, editNote, setSearch } =
  noteSlice.actions;

export default noteSlice.reducer;
