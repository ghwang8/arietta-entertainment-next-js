import React from "react";
import EstieIMG from "../public/images/estie.jpg";


const Estie = () => {
  return (
    <div className="component-container scroll founders LOVUR" id="artists2-section">
      <div className="card-image-container LOVUR">
        <div className="box">
            <img src="/images/LOVUR_Estie.jpg" className="LOVUR-img" alt="allen holding the cello" />
        </div>
        <div className="box">
            <img src="/images/LOVUR_David.jpg" className="LOVUR-img" alt="allen holding the cello" />
        </div>
        <div className="box">
            <img src="/images/LOVUR_Luci.jpg" className="LOVUR-img" alt="allen holding the cello" />
        </div>
        <div className="box">
            <img src="/images/LOVUR_Allen.jpg" className="LOVUR-img" alt="allen holding the cello" />
        </div>
        
      </div>
      <div className="card-text-container scroll LOVUR">
      <div className="founder-text-desc-group-container LOVUR">
        <h2 className="card-text-title"><span className="large-text LOVUR">LOVUR</span> String Quartet</h2>
        <p className="card-text-content LOVUR">
            The LOVUR String Quartet, based in Vancouver, is a
            dynamic ensemble known for its versatility,
            performing a wide range of genres from classical to
            contemporary. The quartet comprises Esther Hwang
            (violin 1), David Lee (violin 2), Luci Barz (viola), and
            Allen Zhou (cello), all of whom are also members of
            the Vancouver Metropolitan Orchestra.
        </p>
        <p className="card-text-content LOVUR">
            Founded and led by Esther Hwang, a Juilliard School
            alumna, the quartet boasts a rich history of
            collaboration and friendship, having performed
            together for many years. Their extensive experience
            in live performance is complemented by their
            innovative arrangements and covers, which help them
            reach and resonate with diverse audiences.
        </p>
        <p className="card-text-content LOVUR">
            The name LOVUR is a creative twist on the word
            "lover," reflecting the quartet's passion, dedication,
            and profound connection to the music they perform.
            United by their shared love for music, the LOVUR
            String Quartet strives to create beautiful and
            memorable experiences for their listeners.
        </p>
        </div>
      </div>
    </div>
  );
};

export default Estie;
