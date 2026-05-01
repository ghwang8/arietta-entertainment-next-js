import React from "react";
import { useState } from "react";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";
import styles from "/styles/SeatingMapModal.module.css"; // CSS file for styling

const Landing = () => {
  return (
    <div className="component-container no-snap-scroll" id="twilight-section">
      <div className="card-image-container twilight">
        <div className="twilight-heading-container">
            <h2 className="twilight-heading">TWILIGHT</h2>
            <div className="twilight-subheading-container"><h3 className="twilight-subheading"> CONCERT SERIES</h3></div>
        </div>
        
        <img src="/images/LOVUR_Quartet.jpg" alt="outdoor guitar performance" />
      </div>
      <div className="card-text-container twilight">
        <h3 className="card-text-title twilight">February 14, 2025 at 6:30 PM & 8:00 PM
        </h3>
        <h2 className="card-text-title twilight large">VALENTINES SPECIAL with the LOVUR String Quartet</h2>
        <p className="card-text-content">
            Join us this Valentine's Day for an enchanting evening with the LOVUR String Quartet. Experience the magic of romance as they perform Bridgerton-inspired music from Taylor Swift, Alicia Keys, Rihanna, Beyonce and more. In collaboration with Vancouver's own Fuller Flowers, let love bloom through an unforgettable celebration of music and beauty. Perfect for couples and music lovers alike, this romantic night promises to warm your hearts.
        </p>
        </div>
        <PurchaseTickets />
    </div>
  );
};

const PurchaseTickets = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const eventsArr = [
        {
          id: "a",
          zone: "TIER C",
          price: "54",
          availability: "closed",
          time1url: "https://buy.stripe.com/dR67wqbrwaYIgJa14g",
          time2url: "https://buy.stripe.com/00gdUOans9UE0Kc7sB"
        },
        {
          id: "b",
          zone: "TIER B",
          price: "63",
          availability: "closed",
          time1url: "https://buy.stripe.com/3csaICeDI4Ak78A14h",
          time2url: "https://buy.stripe.com/6oEaIC3Z4c2M9gI7sC"
        },
        {
          id: "c",
          zone: "TIER A",
          price: "72",
          availability: "closed",
          time1url: "https://buy.stripe.com/9AQ03Y67c3wg64w14i",
          time2url: "https://buy.stripe.com/aEU9Ey5385EogJa00b"
        }
      ];

    const handleDivClick = (e) => {
        if (e.target.tagName !== 'A') {
          alert('Please select show time');
        }
    };

    const dialoguePopup = () => {
        alert('Please select show time');
    };

    const events = eventsArr.map((event, key) => {
        return (
        <div 
          key={event.id}
          onClick={handleDivClick} 
          className={`event-option-container twilight ${event.id}`} 
          style={{ position: "relative" }}
        >
          <div style={{position: "relative"}} className={`event-option twilight ${event.id}`}>
            {/* SOLD OUT Overlay */}
                {event.availability === "closed" && (
                    <div className="sold-out-overlay">
                        SOLD OUT
                    </div>
                )}
            <div className={`event-option-img-container ${event.id} twilight`}>
                <h2>{event.zone}</h2>  
                <div className="seating-map-btn-container">
                    <a className="seating-map-btn" onClick={openModal}>
                        VIEW SEATING MAP
                    </a>
                </div>
            </div>
            <div className="event-option-text twilight">
                <div className="event-option-title-container twilight">
                    <h3 className="event-option-title">
                        CA${event.price}.00
                    </h3>
                    <p>*price before tax</p>
                </div>
                <div className="event-option-description-container twilight">
                    <ul className="event-option-description-ul">
                        <li>
                            <img style={{width: '19px', marginRight: '5px'}} src="/images/icons/date.png" alt="date" />
                            Friday February 14, 2025
                        </li>
                        <li>
                            <img style={{width: '19px', marginRight: '5px'}} src="/images/icons/pin.png" alt="location" />
                            Fuller Flowers
                        </li>
                        <li>1041 Kingsway, Vancouver, BC</li>
                    </ul>
                </div>
                <div className="inquiry-button-container twilight">
                    <p>Select Time Below:</p>
                    <div className="single-inquiry-button-container twilight">
                         {/* Fixed-height div for "Only a few left" message */}
                            <div style={{ height: "20px", display: "flex", alignItems: "center" }}>
                                {/* "Only a few left" Notice */}
                                {event.availability === "few" && (
                                    <p style={{ color: "red", fontWeight: "bold", visibility: "visible" }}>
                                        **Only two left!**
                                    </p>
                                 )}
                    </div>
                        <a
                            href={event.time1url}
                            rel="noreferrer"
                            target="_blank"
                            className="button1 twilight"
                        >
                            6:30 PM PURCHASE
                        </a>  
                    </div>
                    <div className="single-inquiry-button-container twilight">
                        <a
                            onClick={dialoguePopup}
                            rel="noreferrer"
                            target="_blank"
                            className="button1 twilight unavailable"
                        >
                            8:00 PM PURCHASE
                        </a>
                    </div>
                </div>
            </div>
          </div>
        </div>
        );
    });

    return (
        <div className="purchase-tickets-container" id="tickets-section">
            {isModalOpen && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className={styles.closeButton} onClick={closeModal}>
                            &times;
                        </button>
                        <img
                            src="/images/seat_map.jpg"
                            alt="Seating Map"
                            className={styles.modalImage}
                        />
                    </div>
                </div>
            )}
            <div className="purchase-tickets-title-container">
                <h2 className="purchase-tickets-title twilight">
                    PURCHASE TICKETS
                </h2>
            </div>
            <div className="event-options-container twilight">
                {events}
            </div>
        </div>
    );
};

const SeatMap = () => {
    return (
        <div className="component-container no-snap-scroll" id="map-section">
            <h3 className="seating-map-title">
                SEATING MAP
            </h3>
            <div className="map-container">
                <div className="seating-map-stage">
                    Stage
                </div>
                <div className="seating-map-zone a"> 
                    Tier A
                </div>
                <div className="seating-map-zone b">
                    Tier B
                </div>
                <div className="seating-map-zone c">
                    Tier C
                </div>
            </div>
            
        </div>
    )
}


const EventDetails = () => {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        element.scrollIntoView({ behavior: "smooth" });
        
      };
    return (
        <div className="component-container no-snap-scroll" id="event-details-section">
            <div className="basic-details-container event">
                <h3 className="seating-map-title">
                    EVENT DETAILS
                </h3>
               <ul className="basic-details-list">
                    <li className="basic-details-item">
                        <span className="event-bold-text">Venue:</span> Fuller Flowers 1041 Kingsway, Vancouver, BC V5V 3C7
                    </li> 
                    <li className="basic-details-item">
                        <span className="event-bold-text">Date and Time:</span> Friday February 14, 2025 6:30 PM or 8:00 PM (please select specific show)
                    </li> 
                    <li className="basic-details-item">
                        <span className="event-bold-text">Duration:</span> 60 minutes (doors open 30 mins prior to the start time and late entry is not permitted)
                    </li> 
                    <li className="basic-details-item">
                        <span className="event-bold-text">Age Requirement:</span> 8 years old or older. Anyone under the age of 16 must be accompanied by an adult
                    </li> 
               </ul>
            </div>
            <div className="basic-details-container program">
                <h3 className="seating-map-title">
                    PROGRAM DETAILS
                </h3>
                <p>
                    LOVUR String Quartet Top Romantic Hits (including works from Taylor Swift, Alicia Keys, Ariana Grande, Billie Eilish, Rihanna and more)
                </p>
            </div>
            <div className="basic-details-container performers">
                <h3 className="seating-map-title">
                    PERFORMERS
                </h3>
                <p className="basic-details-item">
                    LOVUR String Quartet - read about the musicians <a href="https://www.ariettaentertainment.com/?scrollTo=artists-section" target="_blank" rel="noreferrer" className="external_link">here</a>
                </p>
            </div>
            <div className="basic-details-container venue">
                <h3 className="seating-map-title">
                    VENUE
                </h3>
                <div>
                    <h3 className="seating-map-title sub">Fuller Flowers:</h3>
                    <p>
                    <a href="https://www.fullerflowers.com" rel="noreferrer" target="_blank" className="external_link">Fuller Flowers</a> is a life long dream that is finally coming to fruition. Inspired by our travels abroad, we found our foundations in Amsterdam, where the big picture emerged. Inspired by the Golden Dutch Age artists like Rachel Ruysch and Henricus Maria van Weerts, we want our flowers to evoke old world drama and plentiful flowers. We're creating the dream of a bespoke renaissance inspired florist. Start small and dream big. (<a href="https://www.fullerflowers.com" rel="noreferrer" target="_blank" className="external_link">www.fullerflowers.com</a>)
                </p>
                </div>
                <div>
                    <h3 className="seating-map-title sub">Directions:</h3>
                    <p>
                    <img style={{width: '19px', marginRight: '5px'}} src="/images/icons/pin.png" alt="date" />Fuller Flowers
                    </p>
                    <p>
                        1041 Kingsway, Vancouver, BC V5V 3C7
                    </p>
                    <p>
                        Read FAQs <a href="https://docs.google.com/document/d/e/2PACX-1vSXLdFfWPHCZyE7VZVPlhhap2XwpLvNjamMHcN88tfJqMHSaOeNmIRglYu-63pxVnR0vJcNffkGIUGy/pub" rel="noreferrer" target="_blank" className="external_link">here</a>
                    </p>
                    <p>
                       Seating is first come first served in each zone
                    </p>
                    <p>
                        If you would like to book a private concert, <a href="https://docs.google.com/forms/d/e/1FAIpQLSdiAm6o3_BtB36t-M5cdieyimXr4gcITp4nwtZrFO7pbzyIRg/viewform" rel="noreferrer" target="_blank" className="external_link"> inquire here</a> and select <i>Twilight Concert Series: Private Event</i>
                    </p>
                </div>
            </div>
        </div>
    )
} 

const Twilight = () => {
    return (
        <div id="twilight-section">
            <DesktopNavbar />
            <MobileNavbar />
            <Landing />
            <SeatMap />
            <EventDetails />
        </div>
    )
}

export default Twilight;
