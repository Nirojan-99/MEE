import { Avatar, IconButton, TextareaAutosize } from "@mui/material";
import React, { useState } from "react";
import PostMenu from "./PostMenu";
import ImageStack from "./ImageStack";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import SendIcon from "@mui/icons-material/Send";
import Comment from "./Comment";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Post() {
  const [isLikeClicked, setLikeClicked] = useState(false);
  const [commentCount, setCommentCount] = useState(2);
  const [comments, setComments] = useState([1, 2, 3, 4]);
  const [comment, setComment] = useState("");
  //url
  const { BASE_URL, token } = useSelector((state) => state.auth);

  const addComment = () => {
    if (!comment.trim()) {
      return;
    }

    const data = new FormData();
    data.append("comment", comment);

    axios
      .post(`${BASE_URL}auth/login`, data, { headers: { token: token } })
      .then((res) => {
        setComment("");
      })
      .catch(() => {
        toast("Unable to add comment!", { type: "error" });
      });
  };

  const likePost = () => {
    const data = new FormData();
    data.append("comment", comment);

    axios
      .post(`${BASE_URL}auth/login`, data, { headers: { token: token } })
      .then((res) => {
        setComment("");
      })
      .catch(() => {
        toast("Try again!", { type: "error" });
      });
  };

  return (
    <div className="bg-[#eaf8fa] rounded-xl mt-5 px-4 py-3 border border-[#c1e9f0]">
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
        <div>
          <PostMenu />
        </div>
      </div>
      {/*  */}
      <div className="text-[13px] font-semibold my-2 text-justify">
        Tomorrow will bring something new, so leave today as a memory. I'm
        confused: when people ask me what's up, and I point, they groan. We have
        never been to Asia, nor have we visited Africa. Just go ahead and press
        that button. The father died during childbirth. The ants enjoyed the
        barbecue more than the family. Your girlfriend bought your favorite
        cookie crisp cereal but forgot to get milk. Harrold felt confident that
        nobody would ever suspect his spy pigeon. If you really strain your
        ears, you can just about hear the sound of no one giving a damn. The
        changing of down comforters to cotton bedspreads always meant the
        squirrels had returned. I love eating toasted cheese and tuna
        sandwiches. He knew it was going to be a bad day when he saw mountain
        lions roaming the streets. The old apple revels in its authority. Today
        I dressed my unicorn in preparation for the race. Behind the window was
        a reflection that only instilled fear. She had some amazing news to
        share but nobody to share it with. When he had to picnic on the beach,
        he purposely put sand in other people’s food. Excitement replaced fear
        until the final moment. It isn't difficult to do a handstand if you just
        stand on your hands. For the 216th time, he said he would quit drinking
        soda after this last Coke. The stench from the feedlot permeated the car
        despite having the air conditioning on recycled air. The llama couldn't
        resist trying the lemonade.
      </div>
      <div className="mt-2" />
      <ImageStack />
      {/*  */}
      <div className="mt-2 flex flex-1 flex-row items-start space-x-2">
        {isLikeClicked ? (
          <IconButton onClick={() => setLikeClicked(false)}>
            <FavoriteIcon sx={{ color: "red" }} />
          </IconButton>
        ) : (
          <IconButton onClick={() => setLikeClicked(true)}>
            <FavoriteBorderOutlinedIcon />
          </IconButton>
        )}
        <IconButton>
          <ChatOutlinedIcon />
        </IconButton>
      </div>
      {/*  */}
      <div>
        <div>
          {comments.map((item, index) => {
            if (index < commentCount) {
              return <Comment />;
            }
          })}
          {commentCount <= comments.length && (
            <div
              onClick={() => {
                setCommentCount((pre) => {
                  return pre + 1;
                });
              }}
              className="py-2 text-[12px] font-bold cursor-pointer transition-all"
            >
              view more comments
            </div>
          )}
        </div>
        {/*  */}
        <div
          className={"flex-1 flex flex-row space-x-2 items-center object-none"}
        >
          <div
            className={`px-2 py-1 bg-[#c1eaf1] rounded-xl transition-all w-full `}
          >
            <TextareaAutosize
              value={comment}
              onChange={(event) => {
                setComment(event.target.value);
              }}
              className="text-[14px] font-semibold"
              style={{
                width: "100%",
                backgroundColor: "transparent",
                border: 0,
                outline: 0,
              }}
              minRows={1}
              placeholder="your feedback"
            />
          </div>
          <IconButton onClick={addComment} sx={{ bgcolor: "#c1eaf1" }}>
            <SendIcon sx={{ width: 23, height: 23, color: "#333" }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
