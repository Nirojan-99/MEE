import { Grid } from "@mui/material";
import React from "react";
import NavBar from "../Components/NavBar";
import Timeline from "../Components/Timeline";
import SearchBox from "../Components/SearchBox";

export default function Feed() {
  return (
    <div className="h-full w-full flex flex-1 bg-white">
      <Grid container>
        <Grid md={2.3} sx={{position:"relative"}}>
          <NavBar />
        </Grid>
        <Grid md={6.5}>
          <Timeline />
        </Grid>
        <Grid md={3.2}>
          <SearchBox />
        </Grid>
      </Grid>
    </div>
  );
}
