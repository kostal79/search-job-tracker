import { useLayoutEffect, useState } from "react";
import {
  GetAllNotesParamsStatusType,
  INotes,
  SelectedFieldType,
  SortOrderType,
} from "types/types";
import { useAppSelector } from "store/hooks";
import { useParams } from "react-router-dom";
import { ACTIVE_STATUSES, FINISHED_STATUSES } from "@/constants";
import { searchData } from "@/utils";

interface StatusParamsType {
  status?: GetAllNotesParamsStatusType;
}

export function useFilteredData(): INotes[] {
  const { status }: StatusParamsType = useParams();
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
  const searchQuery: string = useAppSelector(
    (state) => state.filters.searchQuery
  );
  const [sortedAndFilteredNotes, setSortedAndFilteredNotes] = useState<
    INotes[]
  >([]);

  useLayoutEffect(() => {
    if (notes.length > 0) {
      const filteredNotes: INotes[] = notes.filter((note: INotes) => {
        const dateFrom: Date = new Date(intervalFrom);
        const dateTo: Date = new Date(intervalTo);
        const dateOfNote = new Date(note.created_at!);

        return (dateOfNote >= dateFrom) &&
          (dateOfNote <= dateTo) &&
          (searchData(note, searchQuery, ["created_at", "status", "_id"])) &&
          (status === "active"
          ? ACTIVE_STATUSES.includes(note.status)
          : status === "finished"
          ? FINISHED_STATUSES.includes(note.status)
          : true);
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
  }, [selectedField, sortOrder, intervalFrom, intervalTo, notes, searchQuery]);

  return sortedAndFilteredNotes;
}
