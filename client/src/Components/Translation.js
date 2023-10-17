import React from "react";

export default function Translation(props) {
  return (
    <>
      {props?.data && (
        <div className="m-3 p-2 border-[1px] border-[#5ac5d8] rounded-lg bg-[#ace2ec]">
          <div className="text-[13px] font-bold text-[#0052cc]">
            Translation
          </div>
          <div className="text-[13px] font-bold text-slate-600">
            {props.data}
          </div>
        </div>
      )}
    </>
  );
}
