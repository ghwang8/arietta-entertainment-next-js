import React, { useState } from "react";
import ReactPlayer from "react-player";
import videos from "../data/work-videos";

/**
 * WorkYoutube.js - YouTube Video Gallery with "Load More"
 *
 * Displays:
 * - Gallery of YouTube videos organized by title and description
 * - Different number of videos on mobile vs desktop
 * - "Load More Videos" button to progressively load more content
 */

const WorkYoutube = () => {
    // Mobile: show 3 videos at a time (indices 0-2)
    const [endVideoIndex, setEndVideoIndex] = useState(2);

    // Desktop: show 6 videos at a time (indices 0-5)
    const [endVideoIndexDesktop, setEndVideoIndexDesktop] = useState(5);

    // Total number of videos available
    const videosArrayLength = videos.length;

    // Create array of videos to display on mobile (slice 0 through endVideoIndex+1)
    const slicedVideosArr = videos.slice(0, endVideoIndex + 1);

    // Create array of videos to display on desktop (slice 0 through endVideoIndexDesktop+1)
    const slicedVideosArrDesktop = videos.slice(0, endVideoIndexDesktop + 1);

    /**
     * Handle "Load More Videos" button click
     * Adds 3 more videos to both mobile and desktop
     */
    const loadVideos = () => {
        setEndVideoIndex(endVideoIndex + 3);           // Add 3 more to mobile
        setEndVideoIndexDesktop(endVideoIndexDesktop + 3); // Add 3 more to desktop
    };

    /**
     * Create video cards for mobile display
     * Maps each video to a card with YouTube player, title, and description
     */
    const videoCards = slicedVideosArr.map((video, key) => (
        <div key={key} className="video-card-container mobile">
            {/* Video player container */}
            <div className="video-container">
                <ReactPlayer
                    width="100%"           // Fill container width
                    height="100%"          // Fill container height
                    url={`https://youtube.com/watch?v=${video.youtubeURL}`}  // YouTube video URL
                    controls={true}        // Show play, pause, etc. controls
                />
            </div>

            {/* Video info below the player */}
            <div className="video-text-container-yt">
                <h2 className="video-title">{video.title}</h2>
                <p className="video-description">{video.description}</p>
            </div>
        </div>
    ));

    /**
     * Create video cards for desktop display
     * Same as mobile but displays more videos
     */
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
        <div className="component-container work scroll tanned-bg" id="work-section">
            {/* Section heading */}
            <h2 className="card-text-title top work">Videos</h2>

            {/* Grid containing all video cards (mobile and desktop versions) */}
            <div className="video-group-container">
                {videoCards}
                {videoCardsDesktop}
            </div>

            {/* Show "Load More Videos" button only if there are more videos to load */}
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
