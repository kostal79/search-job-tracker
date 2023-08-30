import React from "react";
import { useSelector } from "react-redux";
import { pageLimit } from "../constants";
import { useSearchParams } from "react-router-dom";

export default function Pagination() {
  const notes = useSelector((state) => state.notes.notes);
  const totalPages = Math.ceil(notes.length / pageLimit);
  const [searchParams, setSearchParams] = useSearchParams();
  const activePage = Number(searchParams.get("page")) || 1;

  const onClick = (num) => {
    searchParams.set("page", num);
    setSearchParams(searchParams);
  };

  const pageRange = (totalPages) => {
    if (totalPages < 10) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
  };
  return (
    <div className="flex gap-4 justify-center mt-auto mb-10">
      {pageRange(totalPages).map((num) => (
        <button
          key={num}
          onClick={() => onClick(num)}
          className={`w-8 h-8 rounded-full ${
            num === activePage ? "bg-grey-main cursor-default" : "bg-white cursor-pointer"
          }`}
        >
          {num}
        </button>
      ))}
    </div>
  );
}
