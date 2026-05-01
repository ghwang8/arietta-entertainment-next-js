import React from "react";
import EstieIMG from "../public/images/estie.jpg";


const Estie = () => {
  return (
    <div className="component-container scroll founders" id="estie-section">
      <div className="card-image-container estie">
        <img src="/images/estie.jpg" className="founder-img estie" alt="esther holding violin in white dress" />
      </div>
      <div className="card-text-container scroll founders estie">
      <div className="founder-text-desc-group-container estie">
        <h2 className="card-text-title">Meet the Creator</h2>
        <p className="card-text-content">
          Introducing the mastermind behind the scene, Estie. Boasting a collective
          experience of over 15 years in Vancouver's vibrant music scene, Estie
          is a gifted violinist who embarked on her musical journey at the age
          of 3. Her solo debut was at the age of 9 with the Vancouver Symphony
          Orchestra. This debut served as a stepping stone towards a bright
          performing career. Estie has graced the stages of illustrious halls,
          from the Orpheum Theatre to the iconic Carnegie Hall. She pursued her
          Bachelor's degree in Music at the renowned Juilliard School.
        </p>
      </div>
        <h2 className="card-text-title estie">Estie Hwang</h2>
        <div className="founder-text-desc-group-container">
        <span className="founder-text-desc-left">
          <h3>BIOGRAPHY</h3>
          <p className="card-text-content">
          Miss Hwang is known for her ability to captivate audiences with her virtuosic and passionate performances.
        </p>
        <p className="card-text-content">
        She studied at <b>The Juilliard School</b> located in New York City under Professor Daniel Phillips.
        </p>
        <p className="card-text-content">
        She has worked with <b>world class musicians</b> such as David Finckel, Wu Han, David Halen, Paul Kantor, Masao Kawasaki, Sylvia Rosenberg, Richard Aaron, Nam Yun Kim, Donald Weilerstein, Joel Smirnoff, and James Ehnes.
        </p>
        </span>
        <span className="founder-text-desc-right">
          <h3>SOLO APPEARANCES</h3>
          <p className="card-text-content">
          Hong Kong Summer Orchestra

          Vancouver Symphony Orchestra

          Vancouver Metropolitan Orchestra

          Vancouver Academy of Music Senior Orchestra

          Vancouver Philharmonic Orchestra

          Canadian Music Competition Orchestra

          Vancouver Pilgrim Orchestra
          </p>
          <h3>PRIZES</h3>
          <p className="card-text-content"> 
          <i>Shean Strings Competition
          Canadian Music Competition
          National Music Festival
          Vancouver Women’s Music Society Scholarship Competition</i>
          </p>
      
        </span>
      </div>
      </div>
    </div>
  );
};

export default Estie;
