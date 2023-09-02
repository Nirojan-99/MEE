import { Avatar, IconButton, TextareaAutosize } from "@mui/material";
import React, { useEffect, useState } from "react";
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

export default function Post(props) {
  const [isLikeClicked, setLikeClicked] = useState(false);
  const [commentCount, setCommentCount] = useState(2);
  const [comment, setComment] = useState("");
  //url
  const { BASE_URL, token, userID } = useSelector((state) => state.auth);

  const { description, date, url, _id, likes, comments: com } = props.data;
  const [comments, setComments] = useState(com);

  useEffect(() => {
    setLikeClicked(likes?.includes(userID));
  }, []);

  const addComment = () => {
    if (!comment.trim()) {
      return;
    }

    const data = new FormData();
    data.append("comment", comment);
    data.append("postID", _id);

    axios
      .post(`${BASE_URL}sentiment-analysis`, data, {
        headers: { token: token },
      })
      .then((res) => {
        const userName = res.data.userName;
        setComments((pre) => {
          if (pre) {
            return pre.append({ comment, userName });
          } else {
            return [{ comment, userName }];
          }
        });
        setComment("");
      })
      .catch(() => {
        toast("Unable to add comment!", { type: "error" });
      });
  };

  const likePost = (val) => {
    const data = new FormData();
    data.append("productID", _id);
    data.append("action", !isLikeClicked ? "1" : "0");

    axios
      .post(`${BASE_URL}posts/like`, data, { headers: { token: token } })
      .then((res) => {})
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
          <div className="text-[10px] text-[#299FB5] font-semibold">{date}</div>
        </div>
        <div className="flex-1" />
        <div>
          <PostMenu />
        </div>
      </div>
      {/*  */}
      <div className="text-[13px] font-semibold my-2 text-justify">
        {description}
      </div>
      <div className="mt-2" />
      <ImageStack data={url} />
      {url.trim() || (
        <hr className="border-[#c1e9f0] border-b w-full flex-1 mt-1" />
      )}
      {/*  */}
      <div className="mt-2 flex flex-1 flex-row items-start space-x-2">
        {isLikeClicked ? (
          <IconButton
            onClick={() => {
              setLikeClicked(false);
              likePost(false);
            }}
          >
            <FavoriteIcon sx={{ color: "red" }} />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              likePost(true);
              setLikeClicked(true);
            }}
          >
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
          {comments?.map((item, index) => {
            if (index < commentCount) {
              return <Comment data={item} />;
            }
          })}
          {commentCount <= comments?.length && (
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
