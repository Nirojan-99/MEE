import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar } from "@mui/material";
import CustomModal from "./CustomModal";

export default function Account() {
  const [open, setOpen] = useState(false);

  const onClickPhoto = () => {
    setOpen(true);
  };
  return (
    <>
      <CustomModal open={open} handleClose={()=>setOpen(false)}/>
      <div className="p-5 flex-1">
        <div className="text-2xl font-bold text-black font-sans">Account</div>
        <div className="flex flex-1 flex-row mt-10 items-baseline">
          <div>
            <Avatar
              variant="square"
              sx={{ width: "150px", height: "150px", bgcolor: "#c1eaf1" }}
            >
              <PersonIcon sx={{ width: "150px", height: "150px" }} />
            </Avatar>
          </div>
          <div
            onClick={onClickPhoto}
            className="ml-3 font-bold cursor-pointer text-[13px] text-blue-900"
          >
            Change Photo
          </div>
        </div>
        {/*  */}
        <hr className="bg-black my-3" />
        {/*  */}
        <div className="flex flex-col flex-1 space-y-1">
          <div className="text-[13px] font-bold">User Name</div>
          <div className="px-2 py-1 rounded-md bg-[#d5f1f6]">
            <input className="border-0 outline-0 text-[14px] font-bold w-full bg-transparent" />
          </div>
        </div>
        {/*  */}
        <div className="flex flex-col flex-1 space-y-1 mt-2">
          <div className="text-[13px] font-bold">Email ID</div>
          <div className="px-2 py-1 rounded-md bg-[#d5f1f6]">
            <input className="border-0 outline-0 text-[14px] font-bold w-full bg-transparent" />
          </div>
        </div>
        {/*  */}
        <div className="flex flex-col flex-1 space-y-1 mt-2">
          <div className="text-[13px] font-bold">Contact Number</div>
          <div className="px-2 py-1 rounded-md bg-[#d5f1f6]">
            <input className="border-0 outline-0 text-[14px] font-bold w-full bg-transparent" />
          </div>
        </div>
        {/*  */}
        <div className="flex flex-col flex-1 space-y-1 mt-2">
          <div className="text-[13px] font-bold">Address</div>
          <div className="px-2 py-1 rounded-md bg-[#d5f1f6]">
            <input className="border-0 outline-0 text-[14px] font-bold w-full bg-transparent" />
          </div>
        </div>
        {/*  */}
        <div className="flex flex-col flex-1 space-y-1 mt-2">
          <div className="text-[13px] font-bold">Country</div>
          <div className="px-2 py-1 rounded-md bg-[#d5f1f6]">
            <input className="border-0 outline-0 text-[14px] font-bold w-full bg-transparent" />
          </div>
        </div>
        {/*  */}
        <div className="flex flex-col flex-1 space-y-1 mt-2">
          <div className="text-[13px] font-bold">ZIP code</div>
          <div className="px-2 py-1 rounded-md bg-[#d5f1f6]">
            <input className="border-0 outline-0 text-[14px] font-bold w-full bg-transparent" />
          </div>
        </div>
        {/*  */}
        <div className="w-full py-2 bg-[#299FB5] text-white my-5 cursor-pointer rounded-md text-center font-bold">
          SAVE CHANGES
        </div>
        {/*  */}
        <hr className="bg-black my-5" />
        {/*  */}
        <div className="flex flex-col flex-1 space-y-1 mt-2">
          <div className="text-[13px] font-bold">Current Password</div>
          <div className="px-2 py-1 rounded-md bg-[#d5f1f6]">
            <input className="border-0 outline-0 text-[14px] font-bold w-full bg-transparent" />
          </div>
        </div>
        {/*  */}
        <div className="flex flex-col flex-1 space-y-1 mt-2">
          <div className="text-[13px] font-bold">New Password</div>
          <div className="px-2 py-1 rounded-md bg-[#d5f1f6]">
            <input className="border-0 outline-0 text-[14px] font-bold w-full bg-transparent" />
          </div>
        </div>
        {/*  */}
        <div className="flex flex-col flex-1 space-y-1 mt-2">
          <div className="text-[13px] font-bold">Confirm Password</div>
          <div className="px-2 py-1 rounded-md bg-[#d5f1f6]">
            <input className="border-0 outline-0 text-[14px] font-bold w-full bg-transparent" />
          </div>
        </div>
        {/*  */}
        <div className="w-full py-2 bg-[#299FB5] text-white my-5 cursor-pointer rounded-md text-center font-bold">
          SAVE CHANGES
        </div>
      </div>
    </>
  );
}
