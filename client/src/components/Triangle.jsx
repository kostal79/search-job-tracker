import React from "react";
import { RxTriangleDown, RxTriangleUp } from "react-icons/rx";
import { useSearchParams } from "react-router-dom";

export default function Triangle({ fieldName, defaultSort }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sort");
  const sortOrder = searchParams.get("order_increasing");

  if ((!sortBy && defaultSort) || sortBy === fieldName ) {
    return (
      <button onClick={() => {
        sortOrder === "-1"
      }}>
        {sortOrder === "1" ? (
          <RxTriangleDown />
        ) : (
          <RxTriangleUp />
        )}
      </button>
    );
  }
}
