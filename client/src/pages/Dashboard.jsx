import React, { Suspense, useState } from "react";
import SearchInput from "../components/SearchInput";
import ButtonAddNote from "../components/ButtonAddNote";
import Table from "../components/Table";
import { Await, defer, useLoaderData, useSearchParams } from "react-router-dom";
import {
  createNote,
  getActiveNotes,
  getAllNotes,
  getFinishedNotes,
} from "../services/notesApi";
import Dialog from "../components/Dialog";
import FormAddNote from "../components/FormAddNote";
import { useDispatch } from "react-redux";
import { addNote } from "../redux/slices/noteSlice";
import { activeStatuses, finishedStatuses } from "../constants";
import Pagination from "../components/Pagination";

export default function Dashboard() {
  const { notes } = useLoaderData();
  const [open, setOpen] = useState(false);
  const [searchParams, _] = useSearchParams();
  const status = searchParams.get("status");
  const onClose = () => setOpen(false);
  const onOpen = () => setOpen(true);

  const dispatch = useDispatch();

  const initialValues = {
    company: "",
    vacancy: "",
    status: "under review",
    contact: "",
    comment: "",
  };

  const onSubmit = async (values) => {
    const newNote = await createNote(values);
    const currentStatus = values.status;
    if (
      !status ||
      (status === "active" && activeStatuses.includes(currentStatus)) ||
      (status === "finished" && finishedStatuses.includes(currentStatus))
    ) {
      dispatch(addNote(newNote));
    }
    alert(`Created new note`);
    onClose();
  };

  return (
    <div className="flex flex-col w-full ">
      <header className="p-8 flex justify-between border-b border-grey-main">
        <h1 className="text-grey-dark text-3xl font-bold">Data table</h1>
        <section className="w-[70%] flex gap-8 items-center justify-end">
          <SearchInput />
          <ButtonAddNote onClick={onOpen} />
        </section>
      </header>
      <Suspense fallback={<p>Table loading...</p>}>
        <Await resolve={notes}>
          <Table />
          <Pagination />
        </Await>
      </Suspense>
      <Dialog open={open} onClose={onClose}>
        <FormAddNote initialValues={initialValues} onSubmit={onSubmit} />
      </Dialog>
    </div>
  );
}

export async function dashboardLoader({ params, request }) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const status = searchParams.get("status");
  if (!status) {
    return defer({ notes: getAllNotes() });
  } else if (status === "finished") {
    return defer({ notes: getFinishedNotes() });
  } else if (status === "active") {
    return defer({ notes: getActiveNotes() });
  }
}
