import { Navigate, Route, Routes } from "react-router";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import Feed from "./Pages/Feed";
import Profile from "./Pages/Profile";
import MarketPlace from "./Pages/MarketPlace";
import Post from "./Pages/Post";
import { useSelector } from "react-redux";

export default function Pages() {
  //url
  const { token } = useSelector((state) => state.auth);
  return (
    <Routes>
      {token && (
        <>
          <Route path="/marketplace" element={<MarketPlace />} />
          <Route path="/account" element={<Profile />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/" element={<Feed />} />
        </>
      )}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Signup />} />
      <Route path="/forget-password" element={<ForgotPassword />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
