import React from "react";
import Image from "next/image";
import LOVURBackgroundMobile from "../public/images/LOVUR_Quartet_mobile.jpg";
import LOVURBackgroundDesktop from "../public/images/LOVUR_Quartet.jpg";

const ShowcaseVideo = () => {
  return (
    <div className="component-container" id="artists-section">
      <div className="showcase-text-container-LOVUR LOVUR">
        <h2 className="secondary-text slogan">
          LOVUR String Quartet
        </h2>
      </div>
      {/* <video className="background-video mobile" autoPlay loop muted>
        <source src={LOVURBackgroundDesktop} type="video/mp4" />
      </video> */}
      {/* <video className="background-video desktop" autoPlay loop muted>
      <source src={ShowcaseBackgroundDesktop} type="video/mp4" />
      </video> */}
    
      <Image 
        className="LOVUR-bg-image mobile" 
        src={LOVURBackgroundDesktop} 
        alt="LOVUR String Quartet"
        />
    </div>
    
  );
};

export default ShowcaseVideo;
