import React, { useState } from "react";
import ReactPlayer from "react-player";
import videos from "../data/work-videos";

const WorkYoutube = () => {
  const [endVideoIndex, setEndVideoIndex] = useState(2);
  const [endVideoIndexDesktop, setEndVideoIndexDesktop] = useState(5);
  const videosArrayLength = videos.length;
  const slicedVideosArr = videos.slice(0, endVideoIndex + 1);
  const slicedVideosArrDesktop = videos.slice(0, endVideoIndexDesktop + 1);

  const loadVideos = () => {
    setEndVideoIndex(endVideoIndex + 3);
    setEndVideoIndexDesktop(endVideoIndexDesktop + 3);
  };
  const videoCards = slicedVideosArr.map((video, key) => (
    <div key={key} className="video-card-container mobile">
      <div className="video-container">
        <ReactPlayer
          width="100%"
          height="100%"
          url={`https://youtube.com/watch?v=${video.youtubeURL}`}
          controls={true}
        />
      </div>
      <div className="video-text-container-yt">
        <h2 className="video-title">{video.title}</h2>
        <p className="video-description">{video.description}</p>
      </div>
    </div>
  ));
  const videoCardsDesktop = slicedVideosArrDesktop.map((video, key) => (
    <div key={key} className="video-card-container desktop">
      <div className="video-container">
        <ReactPlayer
          width="100%"
          height="100%"
          url={`https://youtube.com/watch?v=${video.youtubeURL}`}
          controls={true}
        />
      </div>
      <div className="video-text-container-yt">
        <p className="video-title">{video.title}</p>
        <p className="video-description">{video.description}</p>
      </div>
    </div>
  ));
  return (
    <div
      className="component-container work scroll tanned-bg"
      id="work-section"
    >
      <h2 className="card-text-title top work">Videos</h2>
      <div className="video-group-container">{videoCards}{videoCardsDesktop}</div>
       {endVideoIndex < videosArrayLength - 1 && (
       <div className="video-button-container load">
        <button onClick={loadVideos} className="button2 work">
          Load more videos
        </button>
      </div>
      )} 
      
    </div>
  );
};

export default WorkYoutube;
