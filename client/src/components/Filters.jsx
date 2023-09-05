import React, { useState } from "react";
import DateSwicher from "./DateSwicher";
import { GoSortAsc } from "react-icons/go";
import { GoSortDesc } from "react-icons/go";

export default function Filters() {
  const [sortBy, setSortBy] = useState("increase");

  const sortIcon =
    sortBy === "increase" ? (
      <GoSortAsc className="w-6 h-6 text-grey-8a ml-5" />
    ) : (
      <GoSortDesc className="w-6 h-6 text-grey-8a ml-5" />
    );

    const sortChangeHandler = () => {
      if (sortBy === "increase") {
        setSortBy("decrease")
      } else {
        setSortBy("increase")
      }
    }

  return (
    <div className="flex justify-end mt-7 gap-5">
      <section className="border-solid border rounded-lg flex items-center">
        <button onClick={sortChangeHandler}>{sortIcon}</button>
        <select className="pr-5 pb-3 pt-3 pl-1 bg-transparent text-grey-8a cursor-pointer appearance-none">
          <option>Company name</option>
          <option>Vacancy</option>
          <option>Contacts</option>
          <option>Status</option>
          <option>Comments</option>
          <option>Created</option>
        </select>
      </section>
      <DateSwicher />
    </div>
  );
}
