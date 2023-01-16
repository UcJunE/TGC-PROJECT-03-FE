import React from "react";
import Lottie from "react-lottie";
import loading from "../assets/images/spinner.json";

export default function Spinner() {
  const options = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={options} style={{ width: "100%" }} />
    </div>
  );
}
