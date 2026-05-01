import React from "react";

const Home = () => {
  const backgroundStyle = {
    backgroundColor: "#000000",
    backgroundImage: "url(/images/temp-home-bg.png)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100%", // Make the container fill the whole viewport height
    overflow: "hidden",
    position: "relative"
  };
  return (
    <div
      style={backgroundStyle}
      className="component-container home"
      id="home-section"
      alt="violin and piano"
    >
      <div className="logo-container home">
        <img src="/images/arietta-logo.svg" alt="arietta logo" />
      </div>
      <div className="slogan-container">
        <h2 className="secondary-text slogan">
          Where live music and entertainment meet excellence.
        </h2>
      </div>
    </div>
  );
};

export default Home;
