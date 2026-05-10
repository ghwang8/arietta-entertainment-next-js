/**
 * PricingForm.js - Main pricing form UI
 *
 * Renders all form fields for:
 * - Client information (name, email, occasion)
 * - Event details (date, time, location, venue)
 * - Pricing selections (ensemble, duration, location)
 * - Add-ons (custom songs, audio system, etc.)
 * - Event notes
 */

import { DURATIONS, OCCASIONS, TIME_OPTIONS, fmt } from "../../data/constants";
import { ensemblePricing, zonePricing } from "../../data/pricing";
import PricingSummary from "./PricingSummary";
import { useState, useEffect } from "react";
import SongSearchSelector from "../SongSearchSelector";

export default function PricingForm({
                                        // Pricing state
                                        ensemble, setEnsemble,
                                        duration, setDuration,
                                        location, setLocation,
                                        customSongs, setCustomSongs,
                                        audioSystem, setAudioSystem,
                                        micOfficiant, setMicOfficiant,
                                        recording, setRecording,
                                        // Event info state
                                        clientName, setClientName,
                                        occasion, setOccasion,
                                        eventDate, setEventDate,
                                        startTime, setStartTime,
                                        endTime, setEndTime,
                                        venueName, setVenueName,
                                        outdoorIndoor, setOutdoorIndoor,
                                        notes, setNotes,
                                        clientEmail, setClientEmail,
                                        // Pricing calculations
                                        subtotal, gst, total, lineItems,
                                        // Form submission
                                        onSubmit, submitting, submitError,
                                    }) {
    const ensembles = Object.keys(ensemblePricing);
    const locations = Object.keys(zonePricing[ensemble] || {});
    const [expandedAddOn, setExpandedAddOn] = useState(null);

    useEffect(() => {
        console.log("expandedAddOn state updated:", expandedAddOn);
    }, [expandedAddOn]);

    const SelectBox = ({ value, onChange, options, placeholder }) => (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="pricing-select"
            style={{ color: value ? "#3d2e1e" : "#b8a88a" }}
        >
            <option value="" disabled>
                {placeholder}
            </option>
            {options.map((o) => (
                <option key={o} value={o}>
                    {o}
                </option>
            ))}
        </select>
    );

    const Step = ({ n, label }) => (
        <div className="pricing-step">
            <div className="pricing-step-number">{n}</div>
            <span className="pricing-step-label">{label}</span>
        </div>
    );

    const FieldLabel = ({ children }) => (
        <div className="pricing-field-label">{children}</div>
    );

    const SectionDivider = ({ label }) => (
        <div className="pricing-section-divider">
            <div className="pricing-divider-line" />
            <span className="pricing-divider-label">{label}</span>
            <div className="pricing-divider-line" />
        </div>
    );

    return (
        <div className="pricing-calculator-container">
            {/* Header */}
            <div className="pricing-header">
                <div className="pricing-tagline">Music for Your Moment</div>
                <h1 className="pricing-title">Arietta</h1>
                <div className="pricing-divider" />
                <p className="pricing-subtitle">Build your custom quote in moments</p>
            </div>

            {/* Card */}
            <div className="pricing-card">
                <div className="pricing-card-accent" />

                <div className="pricing-card-content">
                    {/* ── About You ── */}
                    <SectionDivider label="About You" />

                    <div style={{ marginBottom: "22px" }}>
                        <FieldLabel>First and Last Name</FieldLabel>
                        <input
                            type="text"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            placeholder="e.g. Jane Smith"
                            className={`pricing-input-base ${clientName ? "pricing-input-filled" : "pricing-input-empty"}`}
                        />
                    </div>

                    <div style={{ marginBottom: "22px" }}>
                        <FieldLabel>Type of Occasion</FieldLabel>
                        <SelectBox
                            value={occasion}
                            onChange={setOccasion}
                            options={OCCASIONS}
                            placeholder="Select occasion…"
                        />
                    </div>

                    {/* ── Event Details ── */}
                    <SectionDivider label="Event Details" />

                    <div style={{ marginBottom: "22px" }}>
                        <FieldLabel>Date of Event</FieldLabel>
                        <input
                            type="date"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                            className={`pricing-input-base ${eventDate ? "pricing-input-filled" : "pricing-input-empty"}`}
                            style={{ cursor: "pointer" }}
                        />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "22px" }}>
                        <div>
                            <FieldLabel>Start Time of Event</FieldLabel>
                            <SelectBox
                                value={startTime}
                                onChange={setStartTime}
                                options={TIME_OPTIONS}
                                placeholder="Select time…"
                            />
                        </div>
                        <div>
                            <FieldLabel>End Time of Event</FieldLabel>
                            <SelectBox
                                value={endTime}
                                onChange={setEndTime}
                                options={TIME_OPTIONS}
                                placeholder="Select time…"
                            />
                        </div>
                    </div>

                    {/* ── Pricing ── */}
                    <SectionDivider label="Pricing" />

                    <div style={{ marginBottom: "24px" }}>
                        <Step n="1" label="Choose Your Ensemble" />
                        <SelectBox
                            value={ensemble}
                            onChange={setEnsemble}
                            options={ensembles}
                            placeholder="Select ensemble type…"
                        />
                    </div>

                    <div style={{ marginBottom: "24px" }}>
                        <Step n="2" label="Performance Duration" />
                        <div className="pricing-duration-buttons">
                            {DURATIONS.map((d) => (
                                <button
                                    key={d}
                                    className={`pricing-toggle-btn ${duration === d ? "active" : ""}`}
                                    onClick={() => setDuration(d)}
                                >
                                    {d}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: "24px" }}>
                        <Step n="3" label="Event Location" />
                        <SelectBox
                            value={location}
                            onChange={setLocation}
                            options={locations}
                            placeholder="Select your city…"
                        />
                    </div>

                    <div style={{ marginBottom: "24px" }}>
                        <FieldLabel>Venue Name &amp; Address</FieldLabel>
                        <input
                            type="text"
                            value={venueName}
                            onChange={(e) => setVenueName(e.target.value)}
                            placeholder="e.g. The Fairmont Hotel, 900 W Georgia St, Vancouver"
                            className={`pricing-input-base ${venueName ? "pricing-input-filled" : "pricing-input-empty"}`}
                        />
                    </div>

                    <div style={{ marginBottom: "24px" }}>
                        <FieldLabel>Is the event outdoor or indoor?</FieldLabel>
                        <div className="pricing-outdoor-indoor-buttons">
                            {["Outdoor", "Indoor"].map((opt) => (
                                <button
                                    key={opt}
                                    className={`pricing-outdoor-indoor-btn ${outdoorIndoor === opt ? "active" : ""}`}
                                    onClick={() => setOutdoorIndoor(opt)}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: "24px" }}>
                        <Step n="4" label="Add-Ons (Optional)" />
                        <div className="pricing-addons-container">

                            {/* Custom Songs - Expandable (no ? button) */}
                            <div style={{ marginBottom: "0" }}>
                                <button
                                    onClick={() => setExpandedAddOn(prev =>
                                        prev.includes("Custom Songs")
                                            ? prev.filter(l => l !== "Custom Songs")
                                            : [...prev, "Custom Songs"]
                                    )}
                                    style={{
                                        padding: "12px 16px",
                                        border: expandedAddOn.includes("Custom Songs") ? "1.5px solid #3d2e1e" : "1.5px solid #ddd0bb",
                                        background: expandedAddOn.includes("Custom Songs") ? "#3d2e1e" : "#faf8f4",
                                        color: expandedAddOn.includes("Custom Songs") ? "#f5f0e8" : "#3d2e1e",
                                        borderRadius: expandedAddOn.includes("Custom Songs") ? "4px 4px 0 0" : "4px",
                                        cursor: "pointer",
                                        fontFamily: "'Cormorant Garamond', serif",
                                        fontSize: "16px",
                                        textAlign: "left",
                                        transition: "all 0.15s",
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-start"
                                    }}
                                >
                                    Custom Songs
                                </button>
                                {expandedAddOn.includes("Custom Songs") && (
                                    <div style={{ marginTop: "0", padding: "16px", background: "#fffdf9", border: "1px solid #ddd0bb", borderRadius: "0 0 4px 4px", borderTop: "none" }}>
                                        <SongSearchSelector
                                            customSongs={customSongs}
                                            onCustomSongsChange={setCustomSongs}
                                        />
                                    </div>
                                )}
                            </div>

                            {[
                                { label: "Audio System", active: audioSystem, toggle: () => setAudioSystem(!audioSystem), description: "High-quality speaker system for clear sound throughout your venue." },
                                { label: "Mic for Officiant", active: micOfficiant, toggle: () => setMicOfficiant(!micOfficiant), description: "Wireless microphone for the officiant to be heard clearly." },
                                { label: "Recording", active: recording, toggle: () => setRecording(!recording), description: "Professional audio recording of your event." },
                            ].map(({ label, active, toggle, description }) => (
                                <div key={label} style={{ marginBottom: "12px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                        <button
                                            className={`pricing-addon-btn ${active ? "active" : ""}`}
                                            onClick={toggle}
                                            style={{ flex: 1 }}
                                        >
                                            {label}
                                        </button>
                                        <button
                                            onClick={() => {
                                                console.log("Info button clicked for:", label);
                                                console.log("Current expandedAddOn:", expandedAddOn);
                                                setExpandedAddOn(expandedAddOn === label ? null : label);
                                            }}
                                            style={{
                                                width: "36px",
                                                height: "36px",
                                                border: "1px solid #ddd0bb",
                                                borderRadius: "4px",
                                                background: "#faf8f4",
                                                cursor: "pointer",
                                                fontSize: "18px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            {expandedAddOn === label ? "✕" : "?"}
                                        </button>

                                    </div>
                                    {expandedAddOn === label && (
                                        <div style={{ marginTop: "8px", padding: "12px", background: "#fffdf9", border: "1px solid #ddd0bb", borderRadius: "4px", fontSize: "14px", color: "#8a7560" }}>
                                            {description}
                                        </div>
                                    )}
                                </div>
                            ))}

                        </div>
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                        <FieldLabel>Any additional information about your event?</FieldLabel>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Please let us know if there are any other details regarding your event…"
                            rows={4}
                            className="pricing-textarea"
                        />
                    </div>

                    {/* ── Summary & Submit ── */}
                    <SectionDivider label="Pricing Summary" />

                    <PricingSummary subtotal={subtotal} gst={gst} total={total} lineItems={lineItems} />

                    <SectionDivider label="Get Your Quote" />

                    <div style={{ marginBottom: "20px" }}>
                        <FieldLabel>E-mail Me a Quote</FieldLabel>
                        <input
                            type="email"
                            value={clientEmail}
                            onChange={(e) => setClientEmail(e.target.value)}
                            placeholder="your@email.com"
                            className={`pricing-input-base ${clientEmail ? "pricing-input-filled" : "pricing-input-empty"}`}
                        />
                    </div>
                </div>

                {/* Submit */}
                <div className="pricing-card-footer">
                    {submitError && <p className="pricing-submit-error">{submitError}</p>}
                    <button
                        className="pricing-submit-btn"
                        onClick={onSubmit}
                        disabled={submitting || !clientEmail}
                    >
                        {submitting ? "Sending…" : "Submit & Send My Quote"}
                    </button>
                    <p className="pricing-submit-help-text">
                        A copy of this quote will be sent to your email · All prices in CAD · GST included
                    </p>
                </div>
            </div>

            <p className="pricing-footer-text">
                Prices are estimates — we'll be in touch to confirm availability.
            </p>
        </div>
    );
}