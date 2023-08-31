import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import img from "../Assets/login-side.png";
import logo from "../Assets/logo.png";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login } from "../Store/auth";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //url
  const { BASE_URL } = useSelector((state) => state.auth);

  //submit handler
  const submitHandler = () => {
    if (!email.trim() || !password.trim()) {
      return;
    }

    const data = new FormData();
    data.append("email", email);
    data.append("password", password);

    axios
      .post(`${BASE_URL}auth/login`, data)
      .then((res) => {
        dispatch(login({ userID: res.data.userID, token: res.data.token }));
        navigate("/");
      })
      .catch(() => {});
  };

  return (
    <Box py={7} px={15}>
      <Grid container sx={{ height: "83vh" }}>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={0}
          square
          sx={{ display: "flex" }}
        >
          <div className="my-10 mx-16 flex flex-col  justify-center flex-1 ">
            <div className=" ">
              <div className="flex-1 flex-row  justify-start items-center w-full">
                <img src={logo} className="w-10" />
              </div>
              <div className="text-xl mt-4 mb-2 text-black font-bold w-full text-start ">
                Login to your account
              </div>
              <div className="w-full mt-5">
                <div className="px-2 py-2 w-full border-[#999] border rounded-md flex-1 flex space-x-2 items-center bg-[#FAFBFF]">
                  <EmailOutlinedIcon sx={{ color: "#333" }} />
                  <input
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    className="border-0 outline-0 flex-1  min-w-0 font-semibold placeholder:text-slate-500 placeholder:text-[13px] text-[13px]"
                    placeholder="Email"
                  />
                </div>
                <div className="px-2 mt-6 py-2 w-full border-[#999] border rounded-md flex-1 flex space-x-2 items-center bg-[#FAFBFF]">
                  <LockOutlinedIcon sx={{ color: "#333" }} />
                  <input
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                    type="password"
                    className="border-0 outline-0 flex-1  min-w-0  font-semibold placeholder:text-slate-500 placeholder:text-[13px] text-[13px]"
                    placeholder="Password"
                  />
                </div>
                <div className="flex flex-row flex-1 justify-between mt-6">
                  <div className="flex flex-row items-center space-x-2">
                    <input
                      id="check"
                      type="checkbox"
                      className="border border-black"
                    />
                    <label
                      htmlFor="check"
                      className="text-gray-500 cursor-pointer font-semibold text-sm"
                    >
                      Remember me
                    </label>
                  </div>
                  <a
                    href="/forget-password"
                    className="text-[#299FB5] font-semibold text-sm cursor-pointer"
                  >
                    Forgot password?
                  </a>
                </div>

                <Button
                  disableElevation
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={submitHandler}
                >
                  Log In
                </Button>
                <div className="flex flex-row flex-1 items-center justify-center space-x-2">
                  <div className="text-sm text-black ">Don't have account?</div>
                  <a href="/auth/register" className="text-sm font-semibold">
                    Create an account
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{ bgcolor: "#299FB5" }}
          p={{ xs: 2, sm: 5, md: 10 }}
          flex
          flexDirection={"row"}
        >
          <Box
            sx={{
              flex: 1,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img className="animate-bounce" src={img} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
