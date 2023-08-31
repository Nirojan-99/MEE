import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "./CustomModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Account() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //url
  const { BASE_URL, userID, token } = useSelector((state) => state.auth);

  const onClickPhoto = () => {
    setOpen(true);
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}users/${userID}`, { headers: { token: token } })
      .then((res) => {
        setEmail(res.data.data.email);
        setUserName(res.data.data.userName);
        setContactNumber(res.data.data.contactNumber);
        setAddress(res.data.data.address);
        setZip(res.data.data.zip);
        setCountry(res.data.data.country);
      })
      .catch(() => {});
  }, []);

  const submitHandler = () => {
    const data = new FormData();
    data.append("contactNumber", contactNumber);
    data.append("userName", userName);
    data.append("address", address);
    data.append("zip", zip);
    data.append("country", country);

    axios
      .put(`${BASE_URL}users`, data, { headers: { token: token } })
      .then((res) => {
        window.location.reload();
      })
      .catch(() => {});
  };

  const updatePassword = () => {
    if (newPassword.trim() != confirmPassword.trim()) {
      return;
    }

    const data = new FormData();
    data.append("password", newPassword);

    axios
      .put(`${BASE_URL}users`, data, { headers: { token: token } })
      .then((res) => {
        window.location.reload();
      })
      .catch(() => {});
  };

  return (
    <>
      <CustomModal open={open} handleClose={() => setOpen(false)} />
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
            <input
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
              className="text-[#299FB5] border-0 outline-0 text-[13px] font-bold w-full bg-transparent"
            />
          </div>
        </div>
        {/*  */}
        <div className="flex flex-col flex-1 space-y-1 mt-2">
          <div className="text-[13px] font-bold">Email ID</div>
          <div className="px-2 py-1 rounded-md bg-[#d5f1f6]">
            <input
              disabled
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="text-[#299FB5] border-0 outline-0 text-[13px] font-bold w-full bg-transparent"
            />
          </div>
        </div>
        {/*  */}
        <div className="flex flex-col flex-1 space-y-1 mt-2">
          <div className="text-[13px] font-bold">Contact Number</div>
          <div className="px-2 py-1 rounded-md bg-[#d5f1f6]">
            <input
              value={contactNumber}
              onChange={(event) => setContactNumber(event.target.value)}
              className="text-[#299FB5] border-0 outline-0 text-[13px] font-bold w-full bg-transparent"
            />
          </div>
        </div>
        {/*  */}
        <div className="flex flex-col flex-1 space-y-1 mt-2">
          <div className="text-[13px] font-bold">Address</div>
          <div className="px-2 py-1 rounded-md bg-[#d5f1f6]">
            <input
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              className="text-[#299FB5] border-0 outline-0 text-[13px] font-bold w-full bg-transparent"
            />
          </div>
        </div>
        {/*  */}
        <div className="flex flex-col flex-1 space-y-1 mt-2">
          <div className="text-[13px] font-bold">Country</div>
          <div className="px-2 py-1 rounded-md bg-[#d5f1f6]">
            <input
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              className="text-[#299FB5] border-0 outline-0 text-[13px] font-bold w-full bg-transparent"
            />
          </div>
        </div>
        {/*  */}
        <div className="flex flex-col flex-1 space-y-1 mt-2">
          <div className="text-[13px] font-bold">ZIP code</div>
          <div className="px-2 py-1 rounded-md bg-[#d5f1f6]">
            <input
              value={zip}
              onChange={(event) => setZip(event.target.value)}
              className="text-[#299FB5] border-0 outline-0 text-[13px] font-bold w-full bg-transparent"
            />
          </div>
        </div>
        {/*  */}
        <div
          onClick={submitHandler}
          className="w-full py-2 bg-[#299FB5] text-white my-5 cursor-pointer rounded-md text-center font-bold"
        >
          SAVE CHANGES
        </div>
        {/*  */}
        <hr className="bg-black my-5" />
        {/*  */}
        <div className="flex flex-col flex-1 space-y-1 mt-2">
          <div className="text-[13px] font-bold">Current Password</div>
          <div className="px-2 py-1 rounded-md bg-[#d5f1f6]">
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="text-[#299FB5] border-0 outline-0 text-[13px] font-bold w-full bg-transparent"
            />
          </div>
        </div>
        {/*  */}
        <div className="flex flex-col flex-1 space-y-1 mt-2">
          <div className="text-[13px] font-bold">New Password</div>
          <div className="px-2 py-1 rounded-md bg-[#d5f1f6]">
            <input
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              className="text-[#299FB5] border-0 outline-0 text-[13px] font-bold w-full bg-transparent"
            />
          </div>
        </div>
        {/*  */}
        <div className="flex flex-col flex-1 space-y-1 mt-2">
          <div className="text-[13px] font-bold">Confirm Password</div>
          <div className="px-2 py-1 rounded-md bg-[#d5f1f6]">
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="text-[#299FB5] border-0 outline-0 text-[13px] font-bold w-full bg-transparent"
            />
          </div>
        </div>
        {/*  */}
        <div
          onClick={updatePassword}
          className="w-full py-2 bg-[#299FB5] text-white my-5 cursor-pointer rounded-md text-center font-bold"
        >
          SAVE CHANGES
        </div>
      </div>
    </>
  );
}
