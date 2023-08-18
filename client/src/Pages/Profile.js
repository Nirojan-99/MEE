import { Grid } from "@mui/material";
import React from "react";
import NavBar from "../Components/NavBar";
import Account from "../Components/Account";

export default function Profile() {
  return (
    <div className="h-full w-full flex flex-1 bg-white">
      <Grid container>
        <Grid md={2.3} sx={{ position: "relative" }}>
          <NavBar />
        </Grid>
        <Grid md={6.5}>
            <Account/>
        </Grid>
        <Grid md={3.2}></Grid>
      </Grid>
    </div>
  );
}
