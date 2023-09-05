import { Avatar, IconButton, TextareaAutosize } from "@mui/material";
import React, { useEffect, useState } from "react";
import PostMenu from "../Components/PostMenu";
import ImageStack from "../Components/ImageStack";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import SendIcon from "@mui/icons-material/Send";
import Comment from "../Components/Comment";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import Loading from "../Components/Loading";

export default function Post() {
  const [isLikeClicked, setLikeClicked] = useState(false);
  const [commentCount, setCommentCount] = useState(2);
  const [comments, setComments] = useState();
  const [comment, setComment] = useState("");
  const [isLoaded, setLoaded] = useState(false);
  const [postData, setPostData] = useState();
  const [userName, setUserName] = useState("");
  //url
  const { BASE_URL, token, userID } = useSelector((state) => state.auth);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${BASE_URL}posts/${id}`, { headers: { token } })
      .then((res) => {
        setPostData(res.data.data);
        setLoaded(true);
        setComments(res.data.data.comments);

        setLikeClicked(res.data.data?.likes?.includes(userID));

        axios
          .get(`${BASE_URL}users/${res.data.data.userID}`, {
            headers: { token: token },
          })
          .then((res) => {
            setUserName(res.data.data.userName);
          })
          .catch(() => {
            toast("Unable to fetch data!", { type: "error" });
          });
      })
      .catch((er) => {
        setLoaded(true);
        toast("Unable to fetch data!", { type: "error" });
      });
  }, []);

  const addComment = () => {
    if (!comment.trim()) {
      return;
    }

    const data = new FormData();
    data.append("comment", comment);
    data.append("postID", id);

    axios
      .post(`${BASE_URL}sentiment-analysis`, data, {
        headers: { token: token },
      })
      .then((res) => {
        const userName = res.data.userName;
        setComments((pre) => {
          if (pre) {
            let array = [...pre];
            array.push({ comment, userName });
            return array;
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
    data.append("productID", id);
    data.append("action", !isLikeClicked ? "1" : "0");

    axios
      .post(`${BASE_URL}posts/like`, data, { headers: { token: token } })
      .then((res) => {})
      .catch(() => {
        toast("Try again!", { type: "error" });
      });
  };

  return (
    <div className="h-full w-full flex flex-1 bg-[#445069] py-5">
      {!isLoaded ? (
        <div className="flex-1 flex flex-row items-center justify-center">
          <Loading />
        </div>
      ) : (
        <>
          <Grid container>
            <Grid md={2.3} sx={{ position: "relative" }}></Grid>
            <Grid md={6.5}>
              <div className="bg-[#eaf8fa] rounded-xl  px-4 py-3 border border-[#c1e9f0]">
                {/*  */}
                <div className="flex flex-row items-center">
                  <Avatar
                    sx={{ bgcolor: "#299FB5", width: 45, height: 45 }}
                    src=""
                  >
                    {userName.split("")[0]}
                  </Avatar>
                  <div className="flex flex-col items-start justify-center ml-2">
                    <div className="font-bold text-[14px] ">{userName}</div>
                    <div className="text-[10px] text-[#299FB5] font-semibold">
                      {postData?.date}
                    </div>
                  </div>
                  <div className="flex-1" />
                  <div>
                    <PostMenu />
                  </div>
                </div>
                {/*  */}
                <div className="text-[13px] font-semibold my-2 text-justify">

                  {postData?.description != "undefined" && postData?.description}
                </div>
                <div className="mt-2" />
                <ImageStack data={postData.url} />
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
                        return <Comment data={item} key={index} />;
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
                    className={
                      "flex-1 flex flex-row space-x-2 items-center object-none"
                    }
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
                    <IconButton
                      onClick={addComment}
                      sx={{ bgcolor: "#c1eaf1" }}
                    >
                      <SendIcon sx={{ width: 23, height: 23, color: "#333" }} />
                    </IconButton>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid md={3.2}></Grid>
          </Grid>
        </>
      )}
    </div>
  );
}
