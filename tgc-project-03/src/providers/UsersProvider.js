import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      console.log("check run from nav");
      if (
        JSON.parse(localStorage.getItem("accessToken")) &&
        JSON.parse(localStorage.getItem("refreshToken"))
      ) {
        return true;
      }
      return false;
    },
    registerUser: async (userData) => {
      console.log(
        "it run from register from userProvider with all the userData",
        userData
      );
      try {
        let response = await axios.post(
          BASE_API_URL + "/account/register",
          userData
        );
        toast.success("Account successfully registered");
        if (redirectTo) {
          navigateTo(redirectTo);
          setRedirectTo("");
        } else {
          navigateTo("/");
        }
        return true;
        console.log("response data from", response);
      } catch (error) {
        console.log(error);
      }
    },
    loginUser: async (userData) => {
      // console.log("hello from login user")
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
    logout: async (option = "") => {
      console.log("logout route from provider is triggerred");
      try {
        await axios.post(BASE_API_URL + "/account/logout", {
          refreshToken: JSON.parse(localStorage.getItem("refreshToken")),
        });
        // Clear state
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        if (option !== "expire") {
          toast.success("Logged out successfully");
          navigateTo("/");
        }
      } catch (e) {
        console.log(e);
        // toast.error("An error occurred while logging out. Please try again");
      }
    },
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
}
