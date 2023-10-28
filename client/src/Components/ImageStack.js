import React from "react";
import { useSelector } from "react-redux";

export default function ImageStack(props) {
  const { BASE_URL } = useSelector((state) => state.auth);
  return (
    <>
      {props.data.trim() && (
        <img src={BASE_URL.split("api/")[0] + props.data} />
      )}
    </>
  );
}
