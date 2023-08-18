import { Avatar } from "@mui/material";
import React from "react";

export default function Comment() {
  return (
    <div className="flex flex-1 flex-row bg-[#d5f1f6] p-3 my-2 rounded-xl space-x-2">
      <Avatar sx={{bgcolor:"#299FB5"}}>U</Avatar>
      <div className="flex flex-col flex-1">
        <div className="font-bold text-[#299FB5] text-[14px]">User Name</div>
        <div className="font-semibold text-[12px]">
          Tomorrow will bring something new, so leave today as a memory. I'm
          confused: when people ask me what's up, and I point, they groan. We
          have never been to Asia, nor have we visited Africa. Just go ahead and
          press that button. The father died during childbirth. The ants enjoyed
          the
        </div>
      </div>
    </div>
  );
}
