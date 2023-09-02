import { Avatar } from "@mui/material";
import React from "react";

export default function Comment(props) {
  const { date, userName, comment } = props.data;
  return (
    <div className="flex flex-1 flex-row bg-[#d5f1f6] p-3 my-2 rounded-xl space-x-2">
      <Avatar sx={{ bgcolor: "#299FB5" }}>{userName.split("")[0]}</Avatar>
      <div className="flex flex-col flex-1">
        <div className="font-bold text-[#299FB5] text-[14px]">{userName}</div>
        <div className="font-semibold text-[12px]">
          {comment}
        </div>
      </div>
    </div>
  );
}
