import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAsyncValue, useSearchParams } from "react-router-dom";
import { setNotes } from "../redux/slices/noteSlice";

export default function TableLoader({ children }) {
  const { notes } = useAsyncValue();
  const dispatch = useDispatch();
  const [searchParams, _] = useSearchParams();

  useEffect(() => {
    dispatch(setNotes(notes));
  }, [searchParams]);

  return <>{children}</>;
}
