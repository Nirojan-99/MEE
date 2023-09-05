import React from "react";

export default function ImageStack(props) {
  return (
    <>
      {props.data.trim() && <img src={"http://localhost:5000/" + props.data} />}
    </>
  );
}
