import { Avatar, IconButton } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Recommendation(props) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  //url
  const { BASE_URL, token } = useSelector((state) => state.auth);

  const navigation = () => {
    navigate("./post/" + _id);
  };

  function extractFirst100Words(inputString) {
    const words = inputString.split(/\s+/);

    const first100Words = words.slice(0, 30);

    const resultString = first100Words.join(" ");

    return resultString;
  }

  const {
    description,
    date,
    url,
    _id,
    likes,
    comments: com,
    userID,
  } = props?.data;

  useEffect(() => {
    axios
      .get(`${BASE_URL}users/${userID}`, { headers: { token: token } })
      .then((res) => {
        setUserName(res.data.data.userName);
      })
      .catch(() => {
        toast("Unable to fetch data!", { type: "error" });
      });
  }, []);

  return (
    <div
      onClick={navigation}
      className="bg-[#eaf8fa] rounded-xl mt-5 px-4 py-3 border border-[#c1e9f0] cursor-pointer hover:scale-105 transition-all"
    >
      {/*  */}
      <div className="flex flex-row items-center">
        <Avatar sx={{ bgcolor: "#299FB5", width: 45, height: 45 }} src="">
          {userName.split("")[0]}
        </Avatar>
        <div className="flex flex-col items-start justify-center ml-2">
          <div className="font-bold text-[14px] ">{userName}</div>
          <div className="text-[10px] text-[#299FB5] font-semibold">{date}</div>
        </div>
        <div className="flex-1" />
      </div>
      {/*  */}
      <div className="text-[12px] font-semibold my-2 text-justify">
        {extractFirst100Words(description) + "....."}
      </div>
      <div className="mt-2" />
      <img className=" w-full " src={url} />
    </div>
  );
}
