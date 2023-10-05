import React, { ReactNode, useEffect } from "react";
import { useAsyncValue, useSearchParams } from "react-router-dom";
import { setNotes } from "../redux/slices/noteSlice";
import { useAppDispatch } from "../redux/hooks";
import { INotes } from "../types/types";

interface TableLoaderProps {
  children: ReactNode;
}

interface AsyncValueNotes {
  notes: INotes[] | undefined;
}

export default function TableLoader({ children }: TableLoaderProps): ReactNode {
  const { notes } = useAsyncValue() as AsyncValueNotes;
  const dispatch = useAppDispatch();
  const [searchParams, _] = useSearchParams();

  useEffect(() => {
    if (notes) dispatch(setNotes(notes));
  }, [searchParams]);

  return <>{children}</>;
}
