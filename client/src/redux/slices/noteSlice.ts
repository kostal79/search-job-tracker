import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchStatusType, INoteParams, INotes } from "../../types/types";
import { getAllNotes } from "../../services/notesApi";

interface NotesState {
  items: INotes[];
  fetchStatus: FetchStatusType;
  error: string | null | undefined;
  searchParams: INoteParams | null ;
}

const initialState: NotesState = {
  items: [],
  fetchStatus: "idle",
  error: null,
  searchParams: null,
};

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const response = await getAllNotes();
  return response;
});

export const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<INotes[]>) => {
      state.items = action.payload;
    },
    addNote: (state, action: PayloadAction<INotes>) => {
      state.items.push(action.payload);
    },
    deleteFromNotes: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((note) => note._id !== action.payload);
    },
    editNote: (state, action: PayloadAction<Partial<INotes>>) => {
      const noteId = action.payload._id;
      for (let note of state.items) {
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.error.message;
      })
  },
});

export const { setNotes, addNote, deleteFromNotes, editNote, setSearch } =
  noteSlice.actions;

export default noteSlice.reducer;
