import { ReactNode } from "react";
import DateSwicher from "./DateSwicher";
import SortSelector from "./SortSelector";

export default function Filters(): ReactNode {
  return (
    <div className="flex justify-end mt-7 gap-5">
      <SortSelector />
      <DateSwicher />
    </div>
  );
}
