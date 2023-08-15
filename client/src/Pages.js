import { Navigate, Route, Routes } from "react-router";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import Feed from "./Pages/Feed";

export default function Pages() {
  return (
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Signup />} />
      <Route path="/forget-password" element={<ForgotPassword />} />
      <Route path="/" element={<Feed />} />
    </Routes>
  );
}
