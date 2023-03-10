import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UserContext from "../contexts/UserContext";

const BASE_API_URL ="https://ucjune-project03-db.onrender.com/api"

export default function UserProvider(props) {
  const navigateTo = useNavigate();

  //state
  const [redirectTo, setRedirectTo] = useState("");
  const [name, setName]=useState("")

  //user context
  const userContext = {
    name,
    checkIfAuthenticated: () => {
      // console.log("check run from nav , userProvider");
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
        "it run from register from userProvider with all the userData layer 3",
        userData
      );
      try {
        await axios.post(BASE_API_URL + "/account/register", userData);
        console.log("layer 4")
        toast.success("Account successfully registered");
        if (redirectTo) {
          navigateTo(redirectTo);
          setRedirectTo("");
        } else {
          navigateTo("/");
        }
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    loginUser: async (userData) => {
      console.log("hello from login user")
      try {
        const response = await axios.post(
          BASE_API_URL + "/account/login",
          userData
        );
        console.log("from user provider", response.data);
        if (response.data.status === "fail") {
          toast.error("Invalid username / password");
          return false;
        } else {
            console.log("it went here");
          const accessToken = response.data.accessToken;
          const refreshToken = response.data.refreshToken;
          const username = response.data.username
          setName(username)

          localStorage.setItem("accessToken", JSON.stringify(accessToken));
          localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
          console.log(username)
          //redirect to pages that intended to browse
          if (redirectTo) {
            navigateTo(redirectTo);
            setRedirectTo("");
          } else {
            navigateTo("/");
          }
          return true ;
        }
      } catch (e) {
        console.log(e);
      }
    },
    logoutUser: async (option = "") => {
      console.log("logout route from provider is triggerred");
      try {
        await axios.post(BASE_API_URL + "/account/logout", {
          refreshToken: JSON.parse(localStorage.getItem("refreshToken")),
        });
        // Clear state
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        if (option !== "expire") {
          toast.success("Thanks for shopping with us , Hope to see you again");
          navigateTo("/");
        }
      } catch (e) {
        console.log(e);
        toast.error("An error occurred while logging out");
      }
    },
    refreshToken: async () => {
      //refresh the  token using current JWT and refresh tokens
      console.log("trying to get token if the token alr blacklisted");
      try {
        let response = await axios.post(
          BASE_API_URL + "/account/refresh",
          {
            refreshToken: JSON.parse(localStorage.getItem("refreshToken")),
          },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("accessToken")
              )}`,
            },
          }
        );
        console.log("this is the response from refreshtoken", response.data);
        const accessToken = response.data.accessToken;
        localStorage.setItem("accessToken", JSON.stringify(accessToken));

        return true; // Indicate success
      } catch (e) {
        console.log("this error is from refreshToken route", e);
        if (JSON.parse(localStorage.getItem("refreshToken"))) {
          await userContext.logoutUser("expire");
        }
        navigateTo("/login");
        toast.error("Session expired , Please login again");
        return false; // Indicate failure
      }
    },
    getCartItems: async () => {
      try {
        let response = await axios.get(BASE_API_URL + "/shoppingcart", {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("accessToken")
            )}`,
          },
        });
        const cart = response.data;
        console.log("from uProvider", cart);
        return cart;
      } catch (e) {
        console.log(e);
        toast.error("An error occurred. Please kindly try again");
      }
    },
    updateCartItems: async (product_id, quantity) => {
      try {
        let response = await axios.put(
          BASE_API_URL + `/shoppingcart/${product_id}/update`,
          {
            newQuantity: parseInt(quantity),
          },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("accessToken")
              )}`,
            },
          }
        );
        const result = response.data;
        console.log("Did update cart success ?", result);
        return true;
      } catch (e) {
        console.log(e);
        toast.error(
          "An error occurred while updating the cart item , please try again "
        );
      }
    },
    deleteCartItems: async (product_id) => {
      try {
        const response = await axios.delete(
          BASE_API_URL + `/shoppingcart/${product_id}/remove`,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("accessToken")
              )}`,
            },
          }
        );
        const result = response.data;
        console.log("Item has been deleted", result);
        toast.success("Item has been deleted");
        return true;
      } catch (e) {
        console.log("error from delete route", e);
        toast.error("Unexpected error occured , Please try again");
      }
    },
    addCartItems: async (product_id, quantity) => {
      //1st check if the user alr login
      if (!userContext.checkIfAuthenticated()) {
        setRedirectTo(`/products/${product_id}/info`);
        toast.error("Please login first before add to cart");
        navigateTo("/login");
      } else {
        try {
          //before adding to cart , check for refresh token whether it is still valid, if alr expired den assign new token to client
          await userContext.refreshToken();
          console.log("before add cart"); // it went here
          const response = await axios.post(
            BASE_API_URL + `/shoppingcart/${product_id}/add`,
            {
              quantity: parseInt(quantity),
            },
            {
              headers: {
                Authorization: `Bearer ${JSON.parse(
                  localStorage.getItem("accessToken")
                )}`,
              },
            }
          );
          const result = response.data;
          console.log("this is the data after add cart", result);
          // console.log("success");
          toast.success("Cart item added");
        } catch (e) {
          console.log("error adding cart", e);
          toast.error(
            "An error occured while adding to cart , please try again"
          );
        }
      }
    },
    checkout: async () => {
      //1st  retrieve the cart
      try {
        const allCartItems = await userContext.getCartItems();
        // check if the cart is empty or not
        if (!allCartItems || !allCartItems.length) {
          toast.error("An error occured while checking out , please try again");
          return false;
        } else {
          const response = await axios.get(BASE_API_URL + "/checkout", {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("accessToken")
              )}`,
            },
          });
          let result = response.data;
          console.log("2nd layer result after checkout =>", result);
          return result;
        }
      } catch (e) {
        console.log("Fail to checkout =>", e);
      }
    },
    getOrder: async () => {
      try {
        const response = await axios.get(BASE_API_URL + "/order", {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("accessToken")
            )}`,
          },
        });
        let result = response.data
        console.log("this is the order =>", result)
        return result
      } catch (e) {
        console.log("error retrieving order =>", e);
      }
    },
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
}
