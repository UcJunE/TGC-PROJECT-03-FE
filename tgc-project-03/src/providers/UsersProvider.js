import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import UserContext from "../contexts/UserContext";

const BASE_API_URL =
  "https://8888-ucjune-tgcproject03expr-rrie69uigi5.ws-us81.gitpod.io/api";

export default function UserProvider(props) {
  const navigateTo = useNavigate();

  //state
  const [redirectTo, setRedirectTo] = useState("");

  //user context
  const userContext = {
    checkIfAuthenticated: () => {
      if (
        JSON.parse(localStorage.getItem("accessToken")) &&
        JSON.parse(localStorage.getItem("refreshToken"))
      ) {
        return true;
      }
      return false;
    },
    registerUser: async (userData) => {
      try {
        let response = await axios.post(
          BASE_API_URL + "/account/register",
          userData
        );
      } catch {}
    },
    loginUser: async (userData) => {
      try {
        const response = await axios.post(
          BASE_API_URL + "/account/login",
          userData
        );
        console.log("from user provider", response.data.status);
        if (response.data.status === "fail") {
          toast.error("Invalid username / password");
          return false;
        } else {
        //   console.log("it went here");
          const accessToken = response.data.accessToken;
          const refreshToken = response.data.refreshToken;

          localStorage.setItem("accessToken", JSON.stringify(accessToken));
          localStorage.setItem("refreshToken", JSON.stringify(refreshToken));

          //redirect to pages that intended to browse
          if (redirectTo) {
            navigateTo(redirectTo);
            setRedirectTo("");
          } else {
            navigateTo("/");
          }
          return true;
        }
      } catch (e) {
        console.log(e);
      }
    },
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
}
