import React from "react";
import { useAsyncValue } from "react-router-dom";
import { LuPencil } from "react-icons/lu";
import { LuTrash2 } from "react-icons/lu";

export default function Table() {
  const notes = useAsyncValue();

  return (
    <table className="m-8 text-grey-dark text-base">
      <thead >
        <tr >
          <th className="py-5">Company name</th>
          <th className="py-5">Vacancy</th>
          <th className="py-5">Contacts</th>
          <th className="py-5">Status</th>
          <th className="py-5">Comments</th>
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
              <td>{company}</td>
              <td>{vacancy}</td>
              <td>{contact}</td>
              <td>{status}</td>
              <td>{comment}</td>
              <td>{date}</td>
              <td>
                <button>
                  <LuPencil className="text-grey-8a" />
                </button>
              </td>
              <td>
                <button>
                  <LuTrash2 className="text-grey-8a" />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
