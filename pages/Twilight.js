import React from "react";
import { useState } from "react";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";
import styles from "/styles/SeatingMapModal.module.css"; // CSS file for styling

/**
 * Twilight.js - TWILIGHT Concert Series Page
 *
 * This is a complex page with multiple components handling:
 * - Concert info and marketing
 * - Ticket purchasing with Stripe integration
 * - Seating map modal display
 * - Event details (venue, times, age requirements)
 * - Performer information
 *
 * Current Concert: LOVUR String Quartet Valentine's Day Concert
 * Date: February 14, 2025 at 6:30 PM & 8:00 PM
 */

/**
 * Landing() - Hero section with concert image and headline
 */
const Landing = () => {
    return (
        <div className="component-container no-snap-scroll" id="twilight-section">

            {/* Image container with overlay text */}
            <div className="card-image-container twilight">
                {/* Text overlay on image */}
                <div className="twilight-heading-container">
                    <h2 className="twilight-heading">TWILIGHT</h2>
                    <div className="twilight-subheading-container">
                        <h3 className="twilight-subheading">CONCERT SERIES</h3>
                    </div>
                </div>

                {/* Concert hero image */}
                <img src="/images/LOVUR_Quartet.jpg" alt="LOVUR String Quartet" />
            </div>

            {/* Concert information text */}
            <div className="card-text-container twilight">
                {/* Date and time header */}
                <h3 className="card-text-title twilight">
                    February 14, 2025 at 6:30 PM & 8:00 PM
                </h3>

                {/* Concert title */}
                <h2 className="card-text-title twilight large">
                    VALENTINES SPECIAL with the LOVUR String Quartet
                </h2>

                {/* Concert description */}
                <p className="card-text-content">
                    Join us this Valentine's Day for an enchanting evening with the LOVUR
                    String Quartet. Experience the magic of romance as they perform
                    Bridgerton-inspired music from Taylor Swift, Alicia Keys, Rihanna,
                    Beyonce and more. In collaboration with Vancouver's own Fuller
                    Flowers, let love bloom through an unforgettable celebration of music
                    and beauty. Perfect for couples and music lovers alike, this romantic
                    night promises to warm your hearts.
                </p>
            </div>

            {/* Renders ticket purchasing section */}
            <PurchaseTickets />
        </div>
    );
};

/**
 * PurchaseTickets() - Ticket purchasing section
 *
 * Manages:
 * - Three pricing/seating tiers (Tier A, B, C)
 * - "Sold Out" overlay when not available
 * - Two show times (6:30 PM and 8:00 PM)
 * - Links to Stripe checkout
 * - Seating map modal
 */
const PurchaseTickets = () => {
    // Track if seating map modal is open
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    /**
     * Array of ticket tiers with pricing and availability
     * Each tier has: zone name, price, availability status, and Stripe links for each time
     */
    const eventsArr = [
        {
            id: "a",
            zone: "TIER C",         // Standard seating
            price: "54",            // Price in CAD
            availability: "closed", // "closed" = sold out, "few" = limited stock
            time1url: "https://buy.stripe.com/dR67wqbrwaYIgJa14g",  // 6:30 PM Stripe link
            time2url: "https://buy.stripe.com/00gdUOans9UE0Kc7sB"   // 8:00 PM Stripe link
        },
        {
            id: "b",
            zone: "TIER B",         // Better seating
            price: "63",
            availability: "closed",
            time1url: "https://buy.stripe.com/3csaICeDI4Ak78A14h",
            time2url: "https://buy.stripe.com/6oEaIC3Z4c2M9gI7sC"
        },
        {
            id: "c",
            zone: "TIER A",         // Premium seating
            price: "72",
            availability: "closed",
            time1url: "https://buy.stripe.com/9AQ03Y67c3wg64w14i",
            time2url: "https://buy.stripe.com/aEU9Ey5385EogJa00b"
        }
    ];

    /**
     * Alert if user clicks on event card without selecting a time
     * (Only allow clicks on the time buttons)
     */
    const handleDivClick = (e) => {
        if (e.target.tagName !== 'A') {
            alert('Please select show time');
        }
    };

    /**
     * Alert for unavailable show times
     */
    const dialoguePopup = () => {
        alert('Please select show time');
    };

    /**
     * Map ticket tiers to display cards
     * Each card shows pricing tier, pricing, location info, and purchase buttons
     */
    const events = eventsArr.map((event) => {
        return (
            <div
                key={event.id}
                onClick={handleDivClick}
                className={`event-option-container twilight ${event.id}`}
                style={{ position: "relative" }}
            >
                <div style={{position: "relative"}} className={`event-option twilight ${event.id}`}>

                    {/* "SOLD OUT" overlay - shown if availability is "closed" */}
                    {event.availability === "closed" && (
                        <div className="sold-out-overlay">
                            SOLD OUT
                        </div>
                    )}

                    {/* Seating tier info */}
                    <div className={`event-option-img-container ${event.id} twilight`}>
                        {/* Tier name (A, B, or C) */}
                        <h2>{event.zone}</h2>

                        {/* Button to open seating map modal */}
                        <div className="seating-map-btn-container">
                            <a className="seating-map-btn" onClick={openModal}>
                                VIEW SEATING MAP
                            </a>
                        </div>
                    </div>

                    {/* Ticket information and purchase options */}
                    <div className="event-option-text twilight">

                        {/* Price display */}
                        <div className="event-option-title-container twilight">
                            <h3 className="event-option-title">
                                CA${event.price}.00
                            </h3>
                            <p>*price before tax</p>
                        </div>

                        {/* Event details (date, location, etc.) */}
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

                        {/* Purchase buttons for each time slot */}
                        <div className="inquiry-button-container twilight">
                            <p>Select Time Below:</p>

                            {/* Notice for limited availability (if applicable) */}
                            <div style={{ height: "20px", display: "flex", alignItems: "center" }}>
                                {event.availability === "few" && (
                                    <p style={{ color: "red", fontWeight: "bold" }}>
                                        **Only two left!**
                                    </p>
                                )}
                            </div>

                            {/* 6:30 PM purchase button - links to Stripe checkout */}
                            <div className="single-inquiry-button-container twilight">
                                <a
                                    href={event.time1url}
                                    rel="noreferrer"
                                    target="_blank"
                                    className="button1 twilight"
                                >
                                    6:30 PM PURCHASE
                                </a>
                            </div>

                            {/* 8:00 PM purchase button - currently shows alert (sold out or unavailable) */}
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

            {/* Seating map modal - displayed when isModalOpen is true */}
            {isModalOpen && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    {/* Modal content box */}
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                    >
                        {/* Close button (X) */}
                        <button className={styles.closeButton} onClick={closeModal}>
                            &times;
                        </button>

                        {/* Seating map image */}
                        <img
                            src="/images/seat_map.jpg"
                            alt="Seating Map"
                            className={styles.modalImage}
                        />
                    </div>
                </div>
            )}

            {/* "Purchase Tickets" heading */}
            <div className="purchase-tickets-title-container">
                <h2 className="purchase-tickets-title twilight">
                    PURCHASE TICKETS
                </h2>
            </div>

            {/* Grid of ticket tier cards */}
            <div className="event-options-container twilight">
                {events}
            </div>
        </div>
    );
};

/**
 * SeatMap() - Visual seating arrangement diagram
 *
 * Displays a simple visual representation of venue seating tiers
 */
const SeatMap = () => {
    return (
        <div className="component-container no-snap-scroll" id="map-section">
            <h3 className="seating-map-title">SEATING MAP</h3>

            {/* Seating arrangement container */}
            <div className="map-container">
                {/* Stage label */}
                <div className="seating-map-stage">
                    Stage
                </div>

                {/* Tier A - Premium seating */}
                <div className="seating-map-zone a">
                    Tier A
                </div>

                {/* Tier B - Standard-premium seating */}
                <div className="seating-map-zone b">
                    Tier B
                </div>

                {/* Tier C - Standard seating */}
                <div className="seating-map-zone c">
                    Tier C
                </div>
            </div>
        </div>
    );
};

/**
 * EventDetails() - Comprehensive event information
 *
 * Displays:
 * - Event details (venue, date, time, duration, age requirements)
 * - Program details (what will be performed)
 * - Performer information (LOVUR String Quartet)
 * - Venue information (Fuller Flowers description and directions)
 * - FAQ links and notes about seating
 */
const EventDetails = () => {

    return (
        <div className="component-container no-snap-scroll" id="event-details-section">

            {/* Event logistics section */}
            <div className="basic-details-container event">
                <h3 className="seating-map-title">EVENT DETAILS</h3>

                <ul className="basic-details-list">
                    {/* Venue location */}
                    <li className="basic-details-item">
                        <span className="event-bold-text">Venue:</span> Fuller Flowers
                        1041 Kingsway, Vancouver, BC V5V 3C7
                    </li>

                    {/* Date and show times */}
                    <li className="basic-details-item">
                        <span className="event-bold-text">Date and Time:</span> Friday
                        February 14, 2025 6:30 PM or 8:00 PM (please select specific show)
                    </li>

                    {/* Concert duration */}
                    <li className="basic-details-item">
                        <span className="event-bold-text">Duration:</span> 60 minutes
                        (doors open 30 mins prior to the start time and late entry is not permitted)
                    </li>

                    {/* Age restrictions */}
                    <li className="basic-details-item">
                        <span className="event-bold-text">Age Requirement:</span> 8 years
                        old or older. Anyone under the age of 16 must be accompanied by an adult
                    </li>
                </ul>
            </div>

            {/* Program/setlist section */}
            <div className="basic-details-container program">
                <h3 className="seating-map-title">PROGRAM DETAILS</h3>
                <p>
                    LOVUR String Quartet Top Romantic Hits (including works from Taylor
                    Swift, Alicia Keys, Ariana Grande, Billie Eilish, Rihanna and more)
                </p>
            </div>

            {/* Performer information */}
            <div className="basic-details-container performers">
                <h3 className="seating-map-title">PERFORMERS</h3>
                <p className="basic-details-item">
                    LOVUR String Quartet - read about the musicians
                    <a href="https://www.ariettaentertainment.com/?scrollTo=artists-section"
                       target="_blank" rel="noreferrer" className="external_link">
                        {" "}here
                    </a>
                </p>
            </div>

            {/* Venue information and directions */}
            <div className="basic-details-container venue">
                <h3 className="seating-map-title">VENUE</h3>

                {/* Fuller Flowers venue description */}
                <div>
                    <h3 className="seating-map-title sub">Fuller Flowers:</h3>
                    <p>
                        <a href="https://www.fullerflowers.com" rel="noreferrer"
                           target="_blank" className="external_link">
                            Fuller Flowers
                        </a> is a life long dream that is finally coming to fruition.
                        Inspired by our travels abroad, we found our foundations in Amsterdam,
                        where the big picture emerged. Inspired by the Golden Dutch Age artists
                        like Rachel Ruysch and Henricus Maria van Weerts, we want our flowers
                        to evoke old world drama and plentiful flowers. We're creating the dream
                        of a bespoke renaissance inspired florist. Start small and dream big.
                        (<a href="https://www.fullerflowers.com" rel="noreferrer"
                            target="_blank" className="external_link">
                        www.fullerflowers.com
                    </a>)
                    </p>
                </div>

                {/* Venue directions and additional info */}
                <div>
                    <h3 className="seating-map-title sub">Directions:</h3>

                    {/* Address Pin icon */}
                    <p>
                        <img style={{width: '19px', marginRight: '5px'}}
                             src="/images/icons/pin.png" alt="location" />
                        Fuller Flowers
                    </p>

                    {/* Full address */}
                    <p>1041 Kingsway, Vancouver, BC V5V 3C7</p>

                    {/* FAQ link */}
                    <p>
                        Read FAQs
                        <a href="https://docs.google.com/document/d/e/2PACX-1vSXLdFfWPHCZyE7VZVPlhhap2XwpLvNjamMHcN88tfJqMHSaOeNmIRglYu-63pxVnR0vJcNffkGIUGy/pub"
                           rel="noreferrer" target="_blank" className="external_link">
                            {" "}here
                        </a>
                    </p>

                    {/* Seating note */}
                    <p>Seating is first come first served in each zone</p>

                    {/* Private event option */}
                    <p>
                        If you would like to book a private concert,
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdiAm6o3_BtB36t-M5cdieyimXr4gcITp4nwtZrFO7pbzyIRg/viewform"
                           rel="noreferrer" target="_blank" className="external_link">
                            {" "}inquire here
                        </a> and select <i>Twilight Concert Series: Private Event</i>
                    </p>
                </div>
            </div>
        </div>
    );
};

/**
 * Twilight() - Main export component
 *
 * Orchestrates the entire Twilight concert page by combining:
 * - Desktop and Mobile navigation
 * - Landing section with concert info
 * - Seating map (visual)
 * - Event details (comprehensive info)
 */
const Twilight = () => {
    return (
        <div id="twilight-section">
            {/* Navigation components */}
            <DesktopNavbar />
            <MobileNavbar />

            {/* Page sections */}
            <Landing />
            <SeatMap />
            <EventDetails />
        </div>
    );
};

export default Twilight;
