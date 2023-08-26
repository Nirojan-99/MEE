import React, { useRef, useState } from "react";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import Post from "./Post";
import Suggestion from "./Suggestion";
import { IconButton } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import PostImage from "./PostImage";

export default function Timeline() {
  //hook
  const some = useRef();
  const [nextWord, setNextWord] = useState([]);
  const [open, setOpen] = useState(false);

  const onClickPhoto = () => {
    setOpen(true);
  };

  function sideScroll(direction, speed, distance, step) {
    let scrollAmount = 0;
    var slideTimer = setInterval(function () {
      if (direction == "left") {
        some.current.scrollLeft += step;
      } else {
        some.current.scrollLeft -= step;
      }
      scrollAmount += 1;
      if (scrollAmount >= distance) {
        window.clearInterval(slideTimer);
      }
    }, speed);
  }

  return (
    <>
      <PostImage open={open} handleClose={() => setOpen(false)} />
      <div className="pt-10 px-10  flex-1 h-full ">
        <div className="text-black text-2xl font-extrabold ">Home</div>
        <div className="bg-[#eaf8fa] rounded-xl mt-5">
          <div className="p-2 border-b border-[#97dbe7]">
            <textarea
              rows="2"
              className="border-0 w-full outline-0 text-[14px] font-semibold bg-transparent "
              placeholder="compose new post"
            />
            {/* img */}
            <div className="my-2">
              <img src="https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg?w=2000"/>
            </div>
            {/* next word */}
            <div className=" flex flex-1 flex-row items-center  ">
              <div>
                <IconButton
                  onClick={() => {
                    sideScroll("right", 25, nextWord.length, 8);
                  }}
                >
                  <ArrowLeftIcon sx={{ color: "#299FB5" }} />
                </IconButton>
              </div>
              <div
                ref={some}
                className="flex-1 overflow-hidden flex flex-row space-x-2"
              >
                <Suggestion />
                <Suggestion />
                <Suggestion />
                <Suggestion />
                <Suggestion />
                <Suggestion />
                <Suggestion />
                <Suggestion />
              </div>
              <div>
                <IconButton
                  onClick={() => {
                    sideScroll("left", 25, nextWord.length, 8);
                  }}
                >
                  <ArrowRightIcon sx={{ color: "#299FB5" }} />
                </IconButton>
              </div>
            </div>
          </div>
          <div className="py-2 px-5 flex flex-row space-x-3 items-center">
            <div className="flex flex-row space-x-2 items-center cursor-pointer bg-[#c1eaf1] px-2 py-1 rounded-full">
              <AddPhotoAlternateOutlinedIcon
                sx={{ width: "18px", color: "#333" }}
              />
              <div
                onClick={onClickPhoto}
                className="text-[12px] font-semibold text-[#333]"
              >
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
    </>
  );
}
