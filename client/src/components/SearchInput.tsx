import { useAppDispatch } from "@/store/hooks";
import { clearSearchQuery, setSearchQuery } from "@/store/slices/filterSlice";
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { LuSearch } from "react-icons/lu";
import { LuXCircle } from "react-icons/lu";

export default function SearchInput(): ReactNode {
  const [searchValue, setSearchValue] = useState<string>("");
  const dispatch = useAppDispatch();

  const searchSubmit: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>
  ) => void = (event) => {
    if (searchValue) {
        dispatch(setSearchQuery(searchValue));
    } else {
      dispatch(clearSearchQuery())
    }
  };

  const changeHandler: (event: ChangeEvent<HTMLInputElement>) => void = (
    event
  ) => {
    setSearchValue(event.target.value);
  };

  const clearHandler: (event: MouseEvent<HTMLButtonElement>) => void = () => {
    setSearchValue("");
    dispatch(clearSearchQuery());
  };

  const keyPressHandler: (event: KeyboardEvent<HTMLInputElement>) => void = (
    event
  ) => {
    if (event.key === "Enter") {
      searchSubmit(event);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearSearchQuery());
    };
  }, [dispatch]);

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
