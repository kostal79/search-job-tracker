import React, { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { LuXCircle } from "react-icons/lu";
import { useSearchParams } from "react-router-dom";

export default function SearchInput() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialValue = searchParams.get("search")
    ? searchParams.get("search")
    : "";
  const [searchValue, setSearchValue] = useState(initialValue);

  const searchSubmit = () => {
    console.log("searchValue: ", searchValue);
    searchParams.set("search", searchValue);
    setSearchParams(searchParams);
  };

  const changeHandler = (event) => {
    setSearchValue((prev) => event.target.value);
  };

  const clearHandler = () => {
    setSearchValue("");
    searchParams.delete("search");
    setSearchParams(searchParams);
  };

  const keyPressHandler = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      searchSubmit();
    }
  }


  return (
    <div className="relative w-[70%]">
      <input
        className="px-14 py-2 border-blue-main border outline-none rounded-lg focus:shadow-search-shadow w-[100%] text-base"
        type="search"
        id="gsearch"
        name="gsearch"
        value={searchValue}
        onChange={changeHandler}
        onKeyDown={keyPressHandler}
      />
      <button
        id="search-button"
        className="absolute top-2 left-4"
        onClick={searchSubmit}
      >
        <LuSearch className="text-grey-8a w-6 h-6" />
      </button>
      <button className="absolute top-2 right-4" onClick={clearHandler}>
        <LuXCircle className="text-grey-8a w-6 h-6" />
      </button>
    </div>
  );
}
