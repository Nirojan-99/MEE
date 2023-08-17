import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";

export default function SearchBox() {
  return (
    <div className="px-5 pt-5 shadow-md h-full">
      <div className="bg-[#d6f0f5] rounded-full px-1 py-1 flex flex-row space-x-1">
        <input className="flex-1 bg-transparent border-0 outline-0 px-2 font-semibold text-[14px]" />
        <IconButton sx={{ bgcolor: "#299FB5" }}>
          <SearchIcon sx={{ color: "#fff", "&:hover": { color: "#333" } }} />
        </IconButton>
      </div>
      <div className="text-2xl font-bold text-[#333] my-5 font-['roboto']">
        For you
      </div>
    </div>
  );
}
