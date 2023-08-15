import { Box, Button, Paper } from "@mui/material";
import React from "react";
import logo from "../Assets/logo.png";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function ForgotPassword() {
  return (
    <div className="flex flex-row items-center justify-center flex-1 pt-16">
      <div className="sm:m-2 sm:w-5/6 md:w-2/3 lg:w-1/2 py-5 md:px-8 sm:px-3 bg-white">
        <div className="my-10 mx-16 flex flex-col  justify-center flex-1 ">
          <div className=" ">
            <div className="flex-1 flex-row  justify-start items-center w-full">
              <img src={logo} className="w-10" />
            </div>
            <div className="text-xl mt-4 mb-2 text-black font-bold w-full text-start ">
              Recover your password
            </div>
            <div className="w-full mt-5">
              <div className="px-2 py-1 w-full border-[#999] border rounded-md flex-1 flex space-x-2 items-center bg-[#FAFBFF]">
                <EmailOutlinedIcon sx={{ color: "#333" }} />
                <input
                  className="border-0 outline-0 flex-1  min-w-0 text-lg font-semibold placeholder:text-slate-500 placeholder:text-[13px] text-[14px]"
                  placeholder="Email"
                />
              </div>

              <Button
                disableElevation
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Send OTP
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
