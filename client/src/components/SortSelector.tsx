import React, { ChangeEvent, ReactNode, useState } from "react";
import { GoSortAsc } from "react-icons/go";
import { GoSortDesc } from "react-icons/go";
import { useSearchParams } from "react-router-dom";

export default function SortSelector() : ReactNode {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSortValue : string = searchParams.get("sort")
    ? searchParams.get("sort")!
    : "created_at";
  const initialOrderValue: number = searchParams.get("order")
    ? Number(searchParams.get("order")!)
    : -1;
  const [selected, setSelected] = useState<string>(initialSortValue);
  const [sortBy, setSortBy] = useState<number>(initialOrderValue);

  const sortIcon : ReactNode =
    sortBy === 1 ? (
      <GoSortAsc className="w-6 h-6 text-grey-8a ml-5" />
    ) : (
      <GoSortDesc className="w-6 h-6 text-grey-8a ml-5" />
    );

  const sortChangeHandler: () => void = () => {
    if (sortBy === 1) {
      setSortBy(-1);
      searchParams.set("order", "-1")
      setSearchParams(searchParams)
    } else {
      setSortBy(1);
      searchParams.set("order", "1");
      setSearchParams(searchParams)
    }
  };

  const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
    searchParams.set("sort", event.target.value);
    setSearchParams(searchParams);
  };

  return (
    <section className="border-solid border rounded-lg flex items-center">
      <button onClick={sortChangeHandler}>{sortIcon}</button>
      <select
        onChange={onChangeHandler}
        className="pr-5 pb-3 pt-3 pl-1 bg-transparent text-grey-8a cursor-pointer appearance-none"
        value={selected}
      >
        <option value="created_at">Created</option>
        <option value="company">Company name</option>
        <option value="vacancy">Vacancy</option>
        <option value="contact">Contacts</option>
        <option value="status">Status</option>
        <option value="comment">Comments</option>
      </select>
    </section>
  );
}
