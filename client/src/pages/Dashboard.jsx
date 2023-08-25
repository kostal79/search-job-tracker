import React, { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import { getAllNotes } from "../services/notesApi";
import SearchInput from "../components/SearchInput";
import ButtonAddNote from "../components/ButtonAddNote";

export default function Dashboard() {
  const { notes } = useLoaderData();

  return (
    <div className="flex flex-col w-full">
      <header className="p-8 flex justify-between">
        <h1 className="text-grey-dark text-3xl font-bold">Data table</h1>
        <section className="w-[70%] flex gap-8 items-center justify-end">
          <SearchInput />
          <ButtonAddNote />
        </section>
      </header>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={notes}>
          {notes.map((note) => (
            <li key={note._id}>{note.company}</li>
          ))}
        </Await>
      </Suspense>
    </div>
  );
}

export async function dashboardLoader(userId) {
  const noteList = await getAllNotes(userId);
  return defer({ notes: noteList });
}
