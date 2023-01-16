import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
export default function Success() {
  const navigateTo = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigateTo("/");
    }, 3000);
  }, []);

  return (
    <React.Fragment>
      <div className="container error-body my-5">
        <div className="card error-card">
          <div className="container error-card-container">
            <img
              src={require("../assets/images/error-img.png")}
              className="img-fluid success-img my-3"
              alt="error-img"
            />
          </div>
          <h1 className="success-header mt-2">Error Processing Payment</h1>
          <p className="success-text">
            Please check your security code , card details and connection and
            try again
          </p>
          <Spinner />
        </div>
      </div>
    </React.Fragment>
  );
}
