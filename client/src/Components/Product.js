import { Button, CardMedia, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";

//icon
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
// import calNewPrice from "../../Helper/calNewPrice";
import { useEffect, useState } from "react";
// import calReview from "../../Helper/calReview";

function Product(props) {
  const review = 4;
  const [star, setStar] = useState(0);
  const product = props.data;

  useEffect(() => {
    // setStar(calReview(product?.reviews));
  }, []);

  //url
  const baseURL = "http://localhost:5000/";

  //hook
  const navigate = useNavigate();
  return (
    <>
      <Grid item sx={{ width: { md: 250, xs: 350 } }}>
        <Box
          onClick={() => {
            navigate(`/products/view/${product.id}`);
          }}
          component={Paper}
          elevation={1}
          sx={{
            borderRadius: 1,
            bgcolor: "#fff",
            "&:hover": { transform: "scale(1.01)" },
            transitionDuration: ".3s",
            transitionProperty: "all",
            cursor: "pointer",
          }}
        >
          {/* image sec */}
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              height: 190,
              borderRadius: "5px 5px 0 0 ",
            }}
            image={`https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg?w=2000`}
          />
          {/* title sec */}
          <Box p={1}>
            <Typography
              sx={{
                fontFamily: "Open sans",
                fontWeight: "800",
                fontSize: 13,
                color: "#2B4865",
                letterSpacing: -0.5,
              }}
            >
              Product Name
            </Typography>
            {/* price sec */}
            <Box>
              <Typography
                sx={{
                  color: "red",
                  fontSize: 12,
                  fontFamily: "open sans",
                  fontWeight: "800",
                }}
              >
                Rs : 200
              </Typography>
            </Box>
            {/* rating sec */}
            <Box
              my={1}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#333",
                  fontSize: 10,
                  fontFamily: "open sans",
                  fontWeight: "700",
                }}
              >
                Tomorrow will bring something new, so leave today as a memory.
                I'm confused: when people ask me what's up, and I point, they
                groan. We have never been to Asia, nor have we visited Africa.
                Just go ahead and press that button. The father died during
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
}

export default Product;
