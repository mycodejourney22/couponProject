import React, { useState, useEffect } from "react";
import First from "./First"
import Login from "./Utility/Login"
import jwt_decode from 'jwt-decode';



export default () => {

  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const isAuthenticated = !!token
  const [userId, setUserId] = useState(null)
  const [timeoutId, setTimeoutId] = useState(null)

  // useEffect(() => {

  //   const token = localStorage.getItem('token');

  //   if (token) {
  //     // Decode the JWT to get user information
  //     const decodedToken = jwt_decode(token);

  //     // Extract and set the user ID
  //     setUserId(decodedToken.user_id);
  //   }

  //   // const inactiveTimeout = 2 * 60 * 1000; // 5 minutes
  //   // const newTimeoutId = setTimeout(() => {
  //   //   // Log the user out after inactivity timeout
  //   //   clearToken();
  //   // }, inactiveTimeout);

  //   // // Update the timeout ID
  //   // setTimeoutId(newTimeoutId);

  //   // return () => {
  //   //   // Clear the timeout on unmount
  //   //   clearTimeout(timeoutId);
  //   // };

  // }, [token]);

  // const clearToken = () => {
  //   // Clear token from local storage and state
  //   localStorage.removeItem("token");
  //   setToken("");
  // };


  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token)
      setUserId(decodedToken.user_id)
    }

    const inactiveTimeout = 2 * 60 * 1000
    const newTimeoutId = setTimeout(() => {
      clearToken();
    }, inactiveTimeout);

    setTimeoutId(newTimeoutId)

    return () => {
      clearTimeout(timeoutId)
    };

  }, [token]); // Depend only on 'token'

  const clearToken = () => {
    localStorage.removeItem("token")
    setToken("")
  };


  if (!isAuthenticated) {
    return (
      <Login
        isAuthenticated={isAuthenticated}
        setToken={setToken}
        userId={userId}
        setUserId={setUserId}
      />
    )
  }

  return (
    <First
      isAuthenticated={isAuthenticated}
      userId={userId}
      setUserId={setUserId}
    />
  )
};
