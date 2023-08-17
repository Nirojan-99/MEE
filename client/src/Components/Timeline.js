import React from "react";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import Post from "./Post";
import ImageStack from "./ImageStack";

export default function Timeline() {
  return (
    <div className="pt-10 px-10  flex-1 h-full ">
      <div className="text-black text-2xl font-extrabold ">Home</div>
      <div className="bg-[#eaf8fa] rounded-xl mt-5">
        <div className="p-2 border-b border-[#97dbe7]">
          <textarea
            rows="2"
            className="border-0 w-full outline-0 text-[14px] font-semibold bg-transparent "
            placeholder="compose new post"
          />
        </div>
        <div className="py-2 px-5 flex flex-row space-x-3 items-center">
          <div className="flex flex-row space-x-2 items-center cursor-pointer bg-[#c1eaf1] px-2 py-1 rounded-full">
            <AddPhotoAlternateOutlinedIcon
              sx={{ width: "18px", color: "#333" }}
            />
            <div className="text-[12px] font-semibold text-[#333]">
              Add Photo
            </div>
          </div>
          <div className="flex flex-row space-x-2 items-center cursor-pointer bg-[#c1eaf1] px-2 py-1 rounded-full">
            <VideocamOutlinedIcon sx={{ width: "18px", color: "#333" }} />
            <div className="text-[12px] font-semibold text-[#333]">
              Add video
            </div>
          </div>
          <div className="flex-1" />
          <div>
            <button className="text-white font-bold text-[13px] bg-[#299FB5] px-4 py-1 rounded-full">
              POST
            </button>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="mt-5" />
      <Post />
      <Post />
    </div>
  );
}
