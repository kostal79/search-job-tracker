import React, { useEffect } from "react";
import { useAsyncValue, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNotes } from "../redux/slices/noteSlice";
import ButtonEdit from "./ButtonEdit";
import ButtonDeleteNote from "./ButtonDeleteNote";
import useFilteredNotes from "../hooks/useFilteredNotes";

export default function Table() {
  const notes = useAsyncValue();
  
  const notesStore = useFilteredNotes(notes);

  if (notesStore.length > 0) {
    return (
      <table className="m-8 text-grey-dark text-base table-fixed min-w-[800px]">
        <thead>
          <tr>
            <th className="py-5">Company name</th>
            <th className="py-5">Vacancy</th>
            <th className="py-5">Contacts</th>
            <th className="py-5">Status</th>
            <th className="py-5 w-[40%]">Comments</th>
            <th className="py-5">Created</th>
            <th className="py-5"></th>
            <th className="py-5"></th>
          </tr>
        </thead>
        <tbody>
          {notesStore.map((note, index) => {
            let style =
              index % 2
                ? { backgroundColor: "white" }
                : { backgroundColor: "#F8F8F8" };
            let company = note.company;
            let vacancy = note.vacancy;
            let contact = note.contact;
            let status = note.status;
            let comment = note.comment;
            let date = new Date(note.created_at).toLocaleDateString();
            return (
              <tr key={note._id} style={style}>
                <td className="px-2">{company}</td>
                <td className="px-2">{vacancy}</td>
                <td className="px-2">{contact}</td>
                <td className="px-2">{status}</td>
                <td className="px-2">{comment}</td>
                <td className="px-2">{date}</td>
                <td className="px-2">
                  <ButtonEdit note={note} />
                </td>
                <td className="px-2">
                  <ButtonDeleteNote noteId={note._id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  } else {
    return <p>No notes yet</p>;
  }
}
