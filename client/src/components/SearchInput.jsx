import React, { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { LuXCircle } from "react-icons/lu";

export default function SearchInput() {
  const [searchValue, setSearchValue] = useState("");

  const searchSubmit = () => {
    console.log("search");
  };

  const changeHandler = (event) => {
    setSearchValue(event.target.value);
  };

  const clearHandler = () => {
    setSearchValue("")
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
      />
      <button className="absolute top-2 left-4" onClick={searchSubmit}>
        <LuSearch className="text-grey-8a w-6 h-6"/>
      </button>
      <button className="absolute top-2 right-4" onClick={clearHandler}>
        <LuXCircle className="text-grey-8a w-6 h-6"/>
      </button>
    </div>
  );
}
