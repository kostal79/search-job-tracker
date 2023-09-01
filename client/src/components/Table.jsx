import React from "react";
import ButtonEdit from "./ButtonEdit";
import ButtonDeleteNote from "./ButtonDeleteNote";
import { useSelector } from "react-redux";
import Triangle from "./Triangle";

export default function Table() {
  const notes = useSelector((state) => state.notes.notes);

  if (notes.length > 0) {
    return (
      <table className="mt-8 text-grey-dark text-base table-fixed min-w-[800px]">
        <thead>
          <tr>
            <th className="py-5">
              <span className="flex gap-2 items-center">
                <p>Company name</p>
                <Triangle defaultSort={true} fieldName={"company"} />
              </span>
            </th>
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
          {notes.map((note, index) => {
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
