import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

import UserContext from "../contexts/UserContext";

export default function Checkout() {
    console.log("1st layer checkout")
  const userContext = useContext(UserContext);

  const navigateTo = useNavigate();
  (async () => {
    //get the stripe session id as an object and the publishable key

    let sessionIdObj = {};
    let publishableKey = null;

    const stripeData = await userContext.checkout();
    if (!stripeData) {
      navigateTo("/");
      return;
    }

    if (stripeData) {
      sessionIdObj = { sessionId: stripeData.sessionId };
      publishableKey = stripeData.publishableKey;
    }
    const stripe = await loadStripe(publishableKey);
    stripe.redirectToCheckout(sessionIdObj);
  })();

  return (
    <React.Fragment>
      <div className="container d-flex flex-column justify-content-center align-items-center adjust-margin-top pt-5">
        <h3>Checking out cart in progress</h3>
      </div>
    </React.Fragment>
  );
}
