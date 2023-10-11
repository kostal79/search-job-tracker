import React from "react";
import ButtonData from "./ButtonData";
import ButtonDataActive from "./ButtonDataActive";
import ButtonDataFinished from "./ButtonDataFinished";
import ButtonAnalitics from "./ButtonAnalitics";

export default function NavigationButtons(): React.ReactNode {
  return (
    <nav className="flex flex-col gap-2 mt-10">
      <ButtonData />
      <ButtonDataActive />
      <ButtonDataFinished />
      <ButtonAnalitics />
    </nav>
  );
}
