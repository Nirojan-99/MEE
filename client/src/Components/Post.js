import { Avatar, IconButton, Skeleton, TextareaAutosize } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
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
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import Suggestion from "./Suggestion";
import Translation from "./Translation";
import TranslateIcon from "@mui/icons-material/Translate";

export default function Post(props) {
  const [isLikeClicked, setLikeClicked] = useState(false);
  const [commentCount, setCommentCount] = useState(2);
  const [comment, setComment] = useState("");
  const [nextWord, setNextWord] = useState([]);
  const [maxHeight, setMaxHeight] = useState("0px");
  const [translateOpen, setTranslateOpen] = useState(false);
  const [isTranslationLoaded, setTranslationLoaded] = useState(true);
  const [translation, setTranslation] = useState("");
  const some = useRef();
  //url
  const { BASE_URL, token, userID } = useSelector((state) => state.auth);

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

  const predictNextWord = (comment) => {
    const data = new FormData();

    data.append(
      "previousWords",
      comment?.trim().split(" ")?.slice(-2).join(" ")
    );

    if (!comment.trim()) {
      return setNextWord([]);
    }

    axios
      .post(`${BASE_URL}word-prediction/comments`, data, {
        headers: { token: token },
      })
      .then((res) => {
        if (res) {
          setNextWord(res.data.nextWord);
        }
      })
      .catch(() => {
        setMaxHeight("0px");
      });
  };

  const addNextWord = (val) => {
    setComment((pre) => {
      let data = pre.trim();
      data += " " + val;
      predictNextWord(data);
      return data;
    });
    setNextWord("");
  };

  const {
    description,
    date,
    url,
    _id,
    likes,
    comments: com,
    userID: creatorID,
  } = props.data;
  const [comments, setComments] = useState(com);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setLikeClicked(likes?.includes(userID));
    axios
      .get(`${BASE_URL}users/${creatorID}`, { headers: { token: token } })
      .then((res) => {
        setUserName(res.data.data.userName);
      })
      .catch(() => {
        toast("Unable to fetch data!", { type: "error" });
      });
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
    data.append("productID", _id);
    data.append("action", !isLikeClicked ? "1" : "0");

    axios
      .post(`${BASE_URL}posts/like`, data, { headers: { token: token } })
      .then((res) => {})
      .catch(() => {
        toast("Try again!", { type: "error" });
      });
  };

  const translate = () => {
    if (!comment?.trim()) {
      return;
    }

    setTranslationLoaded(false);
    setTranslateOpen(true);

    const options = {
      method: "GET",
      url: "https://nlp-translation.p.rapidapi.com/v1/translate",
      params: {
        text: comment,
        to: "en",
        from: "ta",
      },
      headers: {
        "X-RapidAPI-Key": "9096355568msh9c4c57c1c38c9e5p1f33a4jsn2a2c12ba90ad",
        "X-RapidAPI-Host": "nlp-translation.p.rapidapi.com",
      },
    };

    axios
      .get(options.url, {
        params: options.params,
        headers: options.headers,
      })
      .then((response) => {
        setTranslation(response?.data?.translated_text?.en);
        setTranslationLoaded(true);
      })
      .catch((error) => {
        console.error(error);
        setTranslationLoaded(true);
      });
  };

  const close = () => {
    setTranslateOpen(false);
  };

  return (
    <div className="bg-[#eaf8fa] rounded-xl mt-5 px-4 py-3 border border-[#c1e9f0]">
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
        <div>
          <PostMenu />
        </div>
      </div>
      {/*  */}
      <div className="text-[13px] font-semibold my-2 text-justify">
        {description != "undefined" && description}
      </div>
      <div className="mt-2" />
      <ImageStack data={url} />
      {url.trim() !== null && (
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
                predictNextWord(event.target.value);
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
        {/* nex word */}
        {nextWord?.length != 0 && (
          <div
            className={` flex flex-1 flex-row items-center max-h-[${maxHeight}]  transition-all`}
          >
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
              {nextWord?.map((item, index) => {
                return (
                  <Suggestion
                    onClick={() => {
                      addNextWord(item);
                    }}
                    key={index}
                    data={item}
                  />
                );
              })}
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
        )}
        {!isTranslationLoaded ? (
          <div className="m-3 p-2 ">
            <Skeleton variant="rounded" width={"100%"} height={60} />
          </div>
        ) : (
          <Translation data={translation} open={translateOpen} close={close} />
        )}

        <IconButton
          onClick={translate}
          sx={{
            borderRadius: 10,
            bgcolor: "#299FB5",
            width: "24px",
            height: "24px",
            "&:hover": {
              bgcolor: "#218191",
            },
            mt:1
          }}
        >
          <TranslateIcon
            sx={{ width: "15px", height: "15px", color: "#fff" }}
          />
        </IconButton>
      </div>
    </div>
  );
}
