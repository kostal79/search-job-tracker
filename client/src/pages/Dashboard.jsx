import React, { Suspense, useState } from "react";
import SearchInput from "../components/SearchInput";
import ButtonAddNote from "../components/ButtonAddNote";
import Table from "../components/Table";
import { Await, defer, useLoaderData } from "react-router-dom";
import { getAllNotes } from "../services/notesApi";
import Dialog from "../components/Dialog";
import FormAddNote from "../components/FormAddNote";

export default function Dashboard() {
  const { notes } = useLoaderData();
  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);
  const onOpen = () => setOpen(true);

  return (
    <div className="flex flex-col w-full ">
      <header className="p-8 flex justify-between border-b border-grey-main">
        <h1 className="text-grey-dark text-3xl font-bold">Data table</h1>
        <section className="w-[70%] flex gap-8 items-center justify-end">
          <SearchInput />
          <ButtonAddNote onClick={onOpen}/>
        </section>
      </header>
      <Suspense fallback={<p>Table loading...</p>}>
        <Await resolve={notes}>
          <Table />
        </Await>
      </Suspense>
      <Dialog open={open} onClose={onClose}>
        <FormAddNote onClose={onClose} />
      </Dialog>
    </div>
  );
}

export async function dashboardLoader(userId) {
  return defer({ notes: getAllNotes(userId) });
}
