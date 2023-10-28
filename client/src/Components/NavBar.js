import React, { useEffect, useState } from "react";
import logo from "../Assets/logo.png";
import { Avatar } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import NotListedLocationOutlinedIcon from "@mui/icons-material/NotListedLocationOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Store/auth";
import axios from "axios";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  const [username, setUserName] = useState("");
  //url
  const { BASE_URL, token, userID } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get(`${BASE_URL}users/${userID}`, { headers: { token: token } })
      .then((res) => {
        setUserName(res.data.data.userName);
      })
      .catch(() => {
        // toast("Unable to fetch data!", { type: "error" });
      });
  }, []);

  return (
    <div className=" h-full p-6 shadow-sm shadow-[#ddd] flex flex-col flex-1 ">
      <div className="flex flex-row items-start ">
        <img src={logo} className="w-20" />
      </div>
      {/*  */}
      <div className="my-9 flex flex-row space-x-4 items-center p-2 w-full rounded-full bg-[#d5f1f6]">
        <Avatar sx={{ bgcolor: "#299FB5", width: 28, height: 28 }} src="">
          {username.split("")[0]}
        </Avatar>
        <div className="font-sans font-bold text-[15px] text-[#1e8494]" id="userName">
          {username}
        </div>
      </div>
      {/*  */}
      <div className="mt-7 flex flex-col space-y-2 flex-1 ">
        <div className="flex  flex-row space-x-5 items-center cursor-pointer hover:bg-[#d5f1f6] p-2 rounded-full pr-3">
          <HomeOutlinedIcon sx={{ color: "#299FB5" }} />
          <a href="/" className="text-[#299FB5] font-bold text-[13px]">
            Home
          </a>
        </div>
        <div className="flex  flex-row space-x-5 items-center cursor-pointer hover:bg-[#d5f1f6] p-2 rounded-full pr-3">
          <AccountCircleOutlinedIcon sx={{ color: "#299FB5" }} />
          <a href="/account" className="text-[#299FB5] font-bold text-[13px]">
            Account
          </a>
        </div>
        {/* <div className="flex  flex-row space-x-5 items-center cursor-pointer hover:bg-[#d5f1f6] p-2 rounded-full pr-3">
          <StorefrontOutlinedIcon sx={{ color: "#299FB5" }} />
          <a
            href="/marketplace"
            className="text-[#299FB5] font-bold text-[13px]"
          >
            Marketplace
          </a>
        </div> */}
        <div className="flex  flex-row space-x-5 items-center cursor-pointer hover:bg-[#d5f1f6] p-2 rounded-full pr-3">
          <NotificationsNoneOutlinedIcon sx={{ color: "#299FB5" }} />
          <a className="text-[#299FB5] font-bold text-[13px]">Notification</a>
        </div>
        <div className="flex  flex-row space-x-5 items-center cursor-pointer hover:bg-[#d5f1f6] p-2 rounded-full pr-3">
          <EmailOutlinedIcon sx={{ color: "#299FB5" }} />
          <div className="text-[#299FB5] font-bold text-[13px]">Message</div>
        </div>
        <div className="flex  flex-row space-x-5 items-center cursor-pointer hover:bg-[#d5f1f6] p-2 rounded-full pr-3">
          <BookmarkBorderOutlinedIcon sx={{ color: "#299FB5" }} />
          <div className="text-[#299FB5] font-bold text-[13px]">Saved</div>
        </div>
        {/* <div className="flex-1"/> */}
        <div className="flex  flex-row space-x-5 items-center cursor-pointer hover:bg-[#d5f1f6] p-2 rounded-full pr-3">
          <NotListedLocationOutlinedIcon sx={{ color: "#299FB5" }} />
          <div className="text-[#299FB5] font-bold text-[13px]">
            Help & Support
          </div>
        </div>
        <div
          onClick={logoutHandler}
          className="flex  flex-row space-x-5 items-center cursor-pointer hover:bg-[#d5f1f6] p-2 rounded-full pr-3"
        >
          <LogoutIcon sx={{ color: "#299FB5" }} />
          <div className="text-[#299FB5] font-bold text-[13px]" id="logout">Logout</div>
        </div>
      </div>
    </div>
  );
}
