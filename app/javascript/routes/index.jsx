import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import CouponForm from "../components/CouponNew/CouponForm";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<CouponForm />} />
    </Routes>
  </Router>
);
