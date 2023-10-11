import { activeStatuses } from "./../constants/index";
import { useLayoutEffect, useState } from "react";
import { INotes, SelectedFieldType, SortOrderType } from "types/types";
import { useAppSelector } from "store/hooks";
import { finishedStatuses } from "@/constants";

export function useFilteredData(): INotes[] {
  const notes: INotes[] = useAppSelector((state) => state.notes.items);
  const selectedField: SelectedFieldType = useAppSelector(
    (state) => state.filters.selectedField
  );
  const sortOrder: SortOrderType = useAppSelector(
    (state) => state.filters.sortOrder
  );
  const intervalFrom: number = useAppSelector(
    (state) => state.filters.dateInterval.from
  );
  const intervalTo: number = useAppSelector(
    (state) => state.filters.dateInterval.to
  );
  const [sortedAndFilteredNotes, setSortedAndFilteredNotes] = useState<
    INotes[]
  >([]);

  useLayoutEffect(() => {
    if (notes.length > 0) {
      const filteredNotes: INotes[] = notes.filter((note) => {
        const dateFrom: Date = new Date(intervalFrom);
        const dateTo: Date = new Date(intervalTo);
        if (note.created_at) {
          return (
            new Date(note.created_at) >= dateFrom &&
            new Date(note.created_at) <= dateTo
          );
        } else {
          return true;
        }
      });
      filteredNotes.sort((a: INotes, b: INotes) => {
        if (selectedField && sortOrder === "asc") {
          return a[selectedField]! < b[selectedField]!
            ? -1
            : a[selectedField]! > b[selectedField]!
            ? 1
            : 0;
        }
        return a[selectedField]! > b[selectedField]!
          ? -1
          : a[selectedField]! < b[selectedField]!
          ? 1
          : 0;
      });
      setSortedAndFilteredNotes(filteredNotes);
    }
  }, [selectedField, sortOrder, intervalFrom, intervalTo, notes]);

  return sortedAndFilteredNotes;
}
