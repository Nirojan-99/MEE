import React from "react";

export default function Suggestion(props) {
  return (
    <div
      onClick={props.onClick}
      className="px-2 py-[3px] rounded-full bg-[#ace2ec] text-[13px] font-semibold cursor-pointer hover:bg-[#299FB5]"
    >
      {props.data}
    </div>
  );
}
