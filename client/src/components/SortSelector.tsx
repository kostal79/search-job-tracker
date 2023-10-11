import { ChangeEvent, ReactNode, useState } from "react";
import { GoSortAsc } from "react-icons/go";
import { GoSortDesc } from "react-icons/go";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setSelectedField, setSortOrder } from "../store/slices/filterSlice";
import { SelectedFieldType } from "../types/types";
import { setFetchStatus } from "../store/slices/noteSlice";

export default function SortSelector(): ReactNode {
  const dispatch = useAppDispatch();
  const selectedField = useAppSelector(state => state.filters.selectedField);
  const sortOrder = useAppSelector(state => state.filters.sortOrder);

  const sortIcon: ReactNode =
  sortOrder === "asc" ? (
      <GoSortAsc className="w-6 h-6 text-grey-8a ml-5" />
    ) : (
      <GoSortDesc className="w-6 h-6 text-grey-8a ml-5" />
    );

  const sortChangeHandler: () => void = () => {
    if (sortOrder === "asc") {
      dispatch(setSortOrder("desc"));
    } else {
      dispatch(setSortOrder("asc"));
    }
  };

  const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedField(event.target.value as SelectedFieldType));
  };

  return (
    <section className="border-solid border rounded-lg flex items-center">
      <button onClick={sortChangeHandler}>{sortIcon}</button>
      <select
        onChange={onChangeHandler}
        className="pr-5 pb-3 pt-3 pl-1 bg-transparent text-grey-8a cursor-pointer appearance-none"
        value={selectedField}
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
