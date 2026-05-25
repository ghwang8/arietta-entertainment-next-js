import React from "react";

const OurWork2 = () => {
    const groupA = [
        { title: "VIOLIN SOLO", link: "" },
        { title: "VIOLIN & PIANO DUO", link: "" }
    ];

    const groupB = [
        { title: "STRING/PIANO TRIO", link: "" },
        { title: "STRING QUARTET", link: "" }
    ];

    return (
        <div className="component-container our-work-2">
            {/* Modal */}
            <div className="our-work-modal">
                <p className="urbanist">LISTEN TO</p>
                <h3>Our Work</h3>
                <p className="urbanist">Our repertoire spans a wide selection of music, from timeless classics to modern hits, with a focus on custom arrangements crafted for each client. Serving Vancouver weddings and corporate events, ARIETTA offers refined live music experiences, including elegant string quartets and professional piano performances.</p>
            </div>

            {/* Video grid wrapper */}
            <div className="our-work-grid-wrapper">
                {/* Group A - Top row */}
                <div className="our-work-group">
                    {groupA.map((video, index) => (
                        <div key={index} className="our-work-video-container">
                            <p className="urbanist">{video.title}</p>
                            <a href={video.link} className="urbanist see-more-link">See More Videos</a>
                        </div>
                    ))}
                </div>

                {/* Group B - Bottom row */}
                <div className="our-work-group">
                    {groupB.map((video, index) => (
                        <div key={index} className="our-work-video-container">
                            <p className="urbanist">{video.title}</p>
                            <a href={video.link} className="urbanist see-more-link">See More Videos</a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OurWork2;