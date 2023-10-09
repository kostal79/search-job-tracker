import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchNotes } from "../redux/slices/noteSlice";
import Table from "../components/Table";

export default function VacanciesActive(): ReactNode {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.notes.items).filter(
    (note) => !["refused", "declined offer"].includes(note.status)
  );
  const fetchStatus = useAppSelector((state) => state.notes.fetchStatus);

  useEffect(() => {
    if (fetchStatus === "idle") {
      dispatch(fetchNotes());
    }
  }, [fetchStatus, dispatch]);

  if (fetchStatus === "loading") {
    return <div>...Loading</div>;
  } else if (fetchStatus === "failed") {
    return <div>Unable to load notes</div>;
  }
  return (
    <>
      <Table notes={notes} />
    </>
  );
}
