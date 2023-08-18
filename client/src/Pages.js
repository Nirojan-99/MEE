import { Navigate, Route, Routes } from "react-router";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import Feed from "./Pages/Feed";
import Profile from "./Pages/Profile";
import MarketPlace from "./Pages/MarketPlace";

export default function Pages() {
  return (
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Signup />} />
      <Route path="/forget-password" element={<ForgotPassword />} />
      <Route path="/marketplace" element={<MarketPlace />} />
      <Route path="/account" element={<Profile />} />
      <Route path="/" element={<Feed />} />
    </Routes>
  );
}
