import { Box, Grid, Pagination } from "@mui/material";
import React, { useState } from "react";
import NavBar from "../Components/NavBar";
import Product from "../Components/Product";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";

export default function MarketPlace() {
  const [count, setCount] = useState(4);
  const handleChange = () => {};
  return (
    <div className="h-full w-full flex flex-1 bg-white">
      <Grid container>
        <Grid md={2.3} sx={{ position: "relative" }}>
          <NavBar />
        </Grid>
        <Grid md={9.7}>
          <div className="p-6 ">
            <div className="flex-1 flex flex-row items-center mb-5">
              <div className="text-black font-bold text-2xl">Marketplace</div>
              <div className="flex-1" />
              <div className="bg-[#d6f0f5] rounded-full px-1 py-1 flex flex-row space-x-1">
                <input className="flex-1 bg-transparent border-0 outline-0 px-2 font-semibold text-[14px]" />
                <IconButton sx={{ bgcolor: "#299FB5" }}>
                  <SearchIcon
                    sx={{ color: "#fff", "&:hover": { color: "#333" } }}
                  />
                </IconButton>
              </div>
            </div>
            {/* prod sec */}
            <Grid
              container
              columnSpacing={2}
              rowSpacing={2}
              justifyContent="space-evenly"
              alignItems={"center"}
              sx={{ my: 2 }}
            >
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
            </Grid>
            {/*  */}
            <Box
              my={2.5}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Pagination
                shape="rounded"
                count={count}
                color="primary"
                onChange={handleChange}
              />
            </Box>
          </div>
        </Grid>
        {/* <Grid md={3.2}></Grid> */}
      </Grid>
    </div>
  );
}
