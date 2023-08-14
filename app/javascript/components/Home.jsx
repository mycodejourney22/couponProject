import React, { useState, useEffect } from "react";
import First from "./First"
import Login from "./Utility/Login";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

export default () => {

  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const isAuthenticated = !!token
  const navigate = useNavigate()

  useEffect(() => {

    localStorage.setItem('token', token);
  }, [token]);

  console.log("token: " + token)

  if (!isAuthenticated) {
    return (
      <Login
        isAuthenticated={isAuthenticated}
        setToken={setToken}
      />
    )
  }

  return (
    <First
      isAuthenticated={isAuthenticated}
    />
  )
};
