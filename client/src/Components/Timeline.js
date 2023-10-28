import React, { useEffect, useRef, useState } from "react";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import Post from "./Post";
import Suggestion from "./Suggestion";
import { IconButton, Skeleton, TextareaAutosize } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import PostImage from "./PostImage";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "./Loading";
import Translation from "./Translation";
import TranslateIcon from "@mui/icons-material/Translate";

export default function Timeline() {
  //hook
  const some = useRef();
  const [nextWord, setNextWord] = useState([]);
  const [posts, setPosts] = useState([]);
  const [description, setDescription] = useState();
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [isTranslationLoaded, setTranslationLoaded] = useState(true);
  const [translateOpen, setTranslateOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState("0px");
  const [translation, setTranslation] = useState("");
  //url
  const { BASE_URL, token } = useSelector((state) => state.auth);

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

  const addPost = () => {
    const data = new FormData();
    data.append("image", image);
    data.append("description", description);

    if (image) {
      axios
        .post(`${BASE_URL}posts/image`, data, {
          headers: { token: token },
        })
        .then((res) => {
          setDescription("");
          setImage("");
          setPreviewUrl("");
          setNextWord([]);
        })
        .catch(() => {
          toast("Unable to post!", { type: "error" });
        });
    } else {
      axios
        .post(`${BASE_URL}posts`, data, {
          headers: { token: token },
        })
        .then((res) => {
          setDescription("");
        })
        .catch((er) => {
          console.log(er);
          toast("Unable to post!", { type: "error" });
        });
    }
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}posts`, {
        headers: { token: token },
      })
      .then((res) => {
        setPosts(res.data.data);
        setLoaded(true);
      })
      .catch((er) => {});
  }, []);

  const predictNextWord = (description) => {
    const data = new FormData();

    data.append(
      "previousWords",
      description?.trim().split(" ")?.slice(-2).join(" ")
    );

    if (!description.trim()) {
      return setNextWord([]);
    }

    axios
      .post(`${BASE_URL}word-prediction`, data, {
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

  const handleClose = (file, url) => {
    setOpen(false);
    setImage(file);
    setPreviewUrl(url);
  };

  const addNextWord = (val) => {
    setDescription((pre) => {
      let data = pre.trim();
      data += " " + val;
      predictNextWord(data);
      return data;
    });
    setNextWord("");
  };

  const translate = () => {
    if (!description?.trim()) {
      return;
    }

    setTranslationLoaded(false);
    setTranslateOpen(true);

    const options = {
      method: "GET",
      url: "https://nlp-translation.p.rapidapi.com/v1/translate",
      params: {
        text: description,
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
    <>
      <PostImage open={open} handleClose={handleClose} />
      <div className="pt-10 px-10  flex-1 h-full ">
        <div className="text-black text-2xl font-extrabold ">Home</div>
        <div className="bg-[#eaf8fa] rounded-xl mt-5">
          <div className="p-2 border-b border-[#97dbe7] overflow-visible">
            <TextareaAutosize
            id="description"
              value={description}
              onChange={(event) => {
                predictNextWord(event.target.value);
                setDescription(event.target.value);
              }}
              className="text-[14px] font-semibold"
              style={{
                width: "100%",
                backgroundColor: "transparent",
                border: 0,
                outline: 0,
              }}
              minRows={3}
              placeholder="compose new post"
            />

            {!isTranslationLoaded ? (
              <div className="m-3 p-2 ">
                <Skeleton variant="rounded" width={"100%"} height={60} />
              </div>
            ) : (
              <Translation
                data={translation}
                open={translateOpen}
                close={close}
              />
            )}

            {/* next word */}
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
            {/* img */}
            <div className={`${previewUrl && "my-2"}  `}>
              <div className=" relative">
                {previewUrl && <img src={previewUrl} className=" " />}
                {previewUrl && (
                  <div className="absolute top-[-10px] right-[-10px]">
                    <IconButton
                      onClick={() => {
                        setPreviewUrl("");
                        setImage("");
                      }}
                      size="small"
                      sx={{
                        bgcolor: "#fff",
                        width: "20px",
                        height: "20px",
                        p: 1,
                        "&:hover": { bgcolor: "#fff" },
                        boxShadow: "0px 0px 2px #333",
                      }}
                    >
                      <CloseIcon sx={{ width: "15px", height: "15px" }} />
                    </IconButton>
                  </div>
                )}
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
              {/* <button
                onClick={translate}
                className="text-white font-bold text-[13px] bg-[#299FB5] px-4 py-1 rounded-full mr-3 hover:bg-[#218191]"
              >
                Translate
              </button> */}
              <IconButton
                onClick={translate}
                sx={{
                  borderRadius: 10,
                  bgcolor: "#299FB5",
                  width: "24px",
                  height: "24px",
                  mr: 1,
                  "&:hover": {
                    bgcolor: "#218191",
                  },
                }}
              >
                <TranslateIcon
                  sx={{ width: "15px", height: "15px", color: "#fff" }}
                />
              </IconButton>
              <button
              id="post"
                onClick={addPost}
                className="text-white font-bold text-[13px] bg-[#299FB5] px-4 py-1 rounded-full hover:bg-[#218191]"
              >
                POST
              </button>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="my-5" />
        {posts.length != 0 &&
          posts.map((item, index) => {
            return <Post key={index} data={item} />;
          })}
        {!isLoaded && (
          <div className="flex-1 h-[500px] flex flex-row items-center justify-center ">
            <Loading />
          </div>
        )}
      </div>
    </>
  );
}
