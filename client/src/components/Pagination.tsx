import React, { ReactNode } from "react";
import { useAsyncValue, useSearchParams } from "react-router-dom";

export default function Pagination(): ReactNode {
  const { totalPages, currentPage } = useAsyncValue() as {totalPages: number, currentPage: number};
  const [searchParams, setSearchParams] = useSearchParams();

  const onClick: (num: number) => void = (num) => {
    searchParams.set("page", num.toString());
    setSearchParams(searchParams);
  };

  const pageRange : (totalPages: number) => Array<number> | undefined  = (totalPages) => {
    if (totalPages < 10) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
  };

  return (
    <div className="flex gap-4 justify-center mt-auto mb-10">
      {pageRange(Number(totalPages))!.map((num) => (
        <button
          key={num}
          onClick={() => onClick(num)}
          className={`w-8 h-8 rounded-full ${
            num === Number(currentPage)
              ? "bg-grey-main cursor-default"
              : "bg-white cursor-pointer"
          }`}
        >
          {num}
        </button>
      ))}
    </div>
  );
}
