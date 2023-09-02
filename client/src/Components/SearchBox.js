import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import Recommendation from "./Recommendation";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

export default function SearchBox() {
  const [recommendation, setRecommendation] = useState([]);
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  //url
  const { BASE_URL, token } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get(`${BASE_URL}recommend`, {
        headers: { token: token },
      })
      .then((res) => {
        setRecommendation(res.data.data);
      })
      .catch((er) => {
        toast("No results found!", { type: "error" });
      });
  }, []);

  const search = () => {
    const data = new FormData();
    data.append("query", query);
    axios
      .post(`${BASE_URL}search`, data, {
        headers: { token: token },
      })
      .then((res) => {
        setSearchResult(res.data.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  return (
    <div className="px-5 pt-5 shadow-md h-full">
      <div className="bg-[#d6f0f5] rounded-full px-1 py-1 flex flex-row space-x-1">
        <input
          value={query}
          onChange={(event) => {
            // search();
            setQuery(event.target.value);
          }}
          className="flex-1 bg-transparent border-0 outline-0 px-2 font-semibold text-[14px]"
        />
        <IconButton
          onClick={() => {
            search();
            // setQuery("");
          }}
          sx={{ bgcolor: "#299FB5" }}
        >
          <SearchIcon sx={{ color: "#fff", "&:hover": { color: "#333" } }} />
        </IconButton>
      </div>
      {query && (
        <>
          <div className="text-2xl font-bold text-[#333] my-5 font-['roboto']">
            Search result
          </div>
          <div>
            {searchResult &&
              searchResult.map((item, index) => {
                return <Recommendation key={index} data={item} />;
              })}
          </div>
        </>
      )}
      <div className="text-2xl font-bold text-[#333] my-5 font-['roboto']">
        For you
      </div>
      <div>
        {recommendation &&
          recommendation.map((item, index) => {
            return <Recommendation key={index} data={item} />;
          })}
      </div>
    </div>
  );
}
