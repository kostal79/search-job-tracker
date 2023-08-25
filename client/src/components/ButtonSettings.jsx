import React from "react";
import settingSVG from "../assets/settings.svg";

export default function ButtonSettings() {
  return (
    <button className="bg-white px-3 py-2 rounded-lg border-button-border border">
      <img src={settingSVG} />
    </button>
  );
}
