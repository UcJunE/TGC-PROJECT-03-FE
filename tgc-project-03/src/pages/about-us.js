import React from "react";

export default function About() {
  return (
    <React.Fragment>
      <div className="container about-container">
        <video autoPlay loop muted id="about-video" className="hero-vid">
          <source
            src={require("../assets/images/landing-vid.mp4")}
            type="video/mp4"
          />
        </video>
      </div>
    </React.Fragment>
  );
}
