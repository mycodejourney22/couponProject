import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import CouponForm from "../components/CouponNew/CouponForm";
import Login from "../components/Utility/Login";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/logins" element={<Login />} />
      <Route path="/new" element={<CouponForm />} />
    </Routes>
  </Router>
);
