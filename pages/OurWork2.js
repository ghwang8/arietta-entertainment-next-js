import React from "react";

const OurWork2 = () => {
    const groupA = [
        {
            title: "VIOLIN SOLO",
            link: "https://www.youtube.com/watch?v=DNcs_cHctUo&list=PLPSZ2Zq2cMWs",
            image: "/images/Violin-Solo.png"
        },
        {
            title: "VIOLIN & PIANO DUO",
            link: "https://www.youtube.com/watch?v=BJItzCl8b2w&list=PLUt5J8yZ1HN8",
            image: "/images/Duo.png"
        }
    ];

    const groupB = [
        {
            title: "STRING/PIANO TRIO",
            link: "https://www.youtube.com/watch?v=xf5SGpbgQ0A&list=PLFkeq4S5nHbY",
            image: "/images/Trio.png"
        },
        {
            title: "STRING QUARTET",
            link: "https://www.youtube.com/watch?v=kPHBox7wZ8k&list=PLEdF8vfGwWmE",
            image: "/images/Quartet.png"
        }
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
                        <a key={index} href={video.link} target="_blank" rel="noopener noreferrer" className="our-work-item-wrapper">
                            <div className="our-work-video-photo">
                                <img src={video.image} alt={`${video.title} Performance`} />
                            </div>
                            <div className="our-work-video-container">
                                <p className="urbanist our-work-title">{video.title}</p>
                                <span className="urbanist see-more-link">See More Videos</span>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Group B - Bottom row */}
                <div className="our-work-group">
                    {groupB.map((video, index) => (
                        <a key={index} href={video.link} target="_blank" rel="noopener noreferrer" className="our-work-item-wrapper">
                            <div className="our-work-video-photo">
                                <img src={video.image} alt={`${video.title} Performance`} />
                            </div>
                            <div className="our-work-video-container">
                                <p className="urbanist our-work-title">{video.title}</p>
                                <span className="urbanist see-more-link">See More Videos</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OurWork2;