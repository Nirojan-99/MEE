import { IconButton } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function Translation(props) {

  const close = () => {
    props.close(false);
  };

  return (
    <>
      {props?.data && props?.open && (
        <div className="m-3 p-2 border-[1px] border-[#5ac5d8] rounded-lg bg-[#ace2ec]">
          <div className="flex flex-row ">
            <div className="text-[13px] font-bold text-[#0052cc] flex-1">
              Translation
            </div>
            <div className="-mt-2 -mr-1">
              <IconButton
                onClick={() => {
                  close();
                }}
                size="small"
                sx={{
                  bgcolor: "#2693a6",
                  width: "15px",
                  height: "15px",
                  p: 1,
                  "&:hover": { bgcolor: "#2693a6" },
                }}
              >
                <CloseIcon
                  sx={{ width: "15px", height: "15px", color: "#fff" }}
                />
              </IconButton>
            </div>
          </div>
          <div className="text-[13px] font-bold text-slate-600">
            {props.data}
          </div>
        </div>
      )}
    </>
  );
}
