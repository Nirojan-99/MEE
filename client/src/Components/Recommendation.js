import { Avatar, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Recommendation() {
  const navigate = useNavigate();

  const navigation = () => {
    navigate("./post/131");
  };

  return (
    <div
      onClick={navigation}
      className="bg-[#eaf8fa] rounded-xl mt-5 px-4 py-3 border border-[#c1e9f0] cursor-pointer hover:scale-105 transition-all"
    >
      {/*  */}
      <div className="flex flex-row items-center">
        <Avatar sx={{ bgcolor: "#299FB5", width: 45, height: 45 }} src="">
          N
        </Avatar>
        <div className="flex flex-col items-start justify-center ml-2">
          <div className="font-bold text-[14px] ">User Name</div>
          <div className="text-[10px] text-[#299FB5] font-semibold">
            1 min ago
          </div>
        </div>
        <div className="flex-1" />
        {/* <div>
          <PostMenu />
        </div> */}
      </div>
      {/*  */}
      <div className="text-[12px] font-semibold my-2 text-justify">
        Tomorrow will bring something new, so leave today as a memory. I'm
        confused: when people ask me what's up, and I point, they groan.
      </div>
      <div className="mt-2" />
      <img
        className=" w-full "
        src="https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg?w=2000"
      />
    </div>
  );
}
