import React from "react";

const OtherArtists = () => {
  const artistsArr = [
    {
      id: "a",
      img: "/images/group_photo.jpg",
      title: "STRING ROSTER",
      description:
        "Our string roster represents the epitome of musical excellence. Featuring violinists, violists, cellists, double bassists, and guitarists, these accomplished artists bring a wealth of experience and unmatched artistry to the stage. Every musician in our roster is a graduate of prestigious music programs and has performed in esteemed concert halls, international festivals, and exclusive private events. Their technical precision, expressive depth, and ability to adapt to any musical style ensure that your event is elevated to a level of sophistication and charm that only live music can provide. Whether you're envisioning a refined classical performance, a lively pop arrangement, or a customized musical experience, our string musicians are here to bring your vision to life.",
      url: "https://forms.gle/6DmoDgb2Y3CPDU2C6"
    },
    {
      id: "b",
      img: "/images/duo_photo.jpg",
      title: "PIANO ROSTER",
      description:
        "Our piano roster features some of the most talented and versatile pianists in the industry. These artists are not only graduates of leading conservatories but also seasoned performers who have graced the stages of prestigious venues and high-profile events. Their expertise spans a diverse range of genres, from timeless classical works to vibrant jazz standards and contemporary favorites. Whether performing as soloists, accompanying other ensembles, or delivering custom musical arrangements, our pianists infuse every note with elegance and artistry. Their ability to connect with audiences and create unforgettable musical moments makes them an indispensable addition to any event seeking the highest caliber of live music.",
      url: "https://forms.gle/6DmoDgb2Y3CPDU2C6"
    }
  ];
  const artists = artistsArr.map((artist, key) => {
    return (
      <div key={key} className={`artist-option ${artist.id}`}>
        <div className="artist-option-title-container">
          <h3 className="artist-option-title">{artist.title}</h3>
        </div>
        <div className={`artist-option-img-container ${artist.id}`}>
          <img
            className={`artist-option-img ${artist.id}`}
            src={artist.img}
            alt="artist"
          />
        </div>
        <div className="artist-option-text">
          <div className="artist-option-description-container"><p className="artist-option-description">{artist.description}</p>
        </div>
          {/* <div className="artist-button-container">
          <a
            href={artist.url}
            rel="noreferrer"
            target="_blank"
            className="button1"
          >
            INQUIRE
          </a>
          </div> */}
         
        </div>
      </div>
    );
  });
  return (
    <div className="component-container" id="other-artists-section">
      <h2 className="card-text-title artist">Other Artists</h2>
      <div className="artist-options-container">{artists}</div>
    </div>
  );
};

export default OtherArtists;
