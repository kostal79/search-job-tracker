import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DateIntervalType, SelectedFieldType, SortOrderType } from "../../types/types";



interface FilterState {
  selectedField: SelectedFieldType;
  sortOrder: SortOrderType;
  dateInterval: DateIntervalType;
}

const initialState: FilterState = {
  selectedField: "created_at",
  sortOrder: "desc",
  dateInterval: {
    from: 1,
    to: Date.now(),
  },
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSelectedField: (state, action: PayloadAction<SelectedFieldType>) => {
      state.selectedField = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<SortOrderType>) => {
      state.sortOrder = action.payload;
    },
    setDate: (state, action: PayloadAction<DateIntervalType>) => {
      state.dateInterval = action.payload;
    },
    resetFilters: (state) => {
      state.selectedField = "created_at";
      state.sortOrder = "asc";
      state.dateInterval = {
        from: Date.now(),
        to: Date.now()
      }
    },
  },
});

export const { setSelectedField, setSortOrder, setDate, resetFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
