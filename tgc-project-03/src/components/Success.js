import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigateTo = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigateTo("/order");
    }, 3000);
  }, []);

  return (
    <React.Fragment>
      <div className="container success-body my-5">
        <div className="card success-card">
          <div className="container success-card-container">
            <img
              src={require("../images/success-img.png")}
              className="img-fluid success-img my-3"
              alt="success-img"
            />
          </div>
          <h1 className="success-header mt-2">Success</h1>
          <p className="success-text">
            We received your purchase request
            <br />
            we'll be in touch shortly!
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}
