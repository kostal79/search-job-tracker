import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { fetchNotes } from "store/slices/noteSlice";
import Table from "components/Table";
import { useFilteredData } from "@/hooks/useFilteredData";
import {
  FetchStatusType,
  GetAllNotesParamsStatusType,
  INotes,
} from "@/types/types";
import { useParams } from "react-router-dom";

interface NoteParamsType {
  status?: GetAllNotesParamsStatusType;
}

export default function VacanciesAll(): ReactNode {
  const { status }: NoteParamsType = useParams();
  const dispatch = useAppDispatch();
  const sortedAndFilteredNotes: INotes[] = useFilteredData();
  const fetchStatus: FetchStatusType = useAppSelector(
    (state) => state.notes.fetchStatus
  );

  useEffect(() => {
    dispatch(fetchNotes({ status: status ? status : "all" }));
  }, [dispatch, status]);

  if (fetchStatus === "loading") {
    return <div>...Loading</div>;
  } else if (fetchStatus === "failed") {
    return <div>Unable to load notes</div>;
  }
  return (
    <>
      <Table notes={sortedAndFilteredNotes!} />
    </>
  );
}
