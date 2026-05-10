/**
 * PricingCalculator - Main pricing calculator component
 *
 * Orchestrates all sub-components and state management.
 */

import { useState, useMemo } from "react";
import emailjs from "@emailjs/browser";
import { ensemblePricing, zonePricing, ensembleMusicians } from "../../data/pricing";
import {
    AUDIO_SYSTEM_PER_MUSICIAN,
    CUSTOM_SONG_PRICE,
    MIC_OFFICIANT_PRICE,
    RECORDING_PRICE,
    GST,
    fmt,
} from "../../data/constants";
import SuccessScreen from "./SuccessScreen";
import SongSearchSelector from "../SongSearchSelector";

// Initialize EmailJS once
if (typeof window !== "undefined") {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
}

// Hourly rates for custom durations
const ensembleHourlyRate = {
    "String Solo": 850,
    "Piano Solo": 900,
    "String Duo": 1150,
    "Violin & Piano Duo": 1200,
    "String Trio": 1300,
    "String Quartet": 1500,
};

// Generate time options (every 30 min)
const timeOptions = (() => {
    const times = [];
    for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += 30) {
            const period = h < 12 ? "AM" : "PM";
            const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
            times.push(`${h12}:${m === 0 ? "00" : "30"} ${period}`);
        }
    }
    return times;
})();

const OCCASIONS = ["Wedding", "Proposal", "Birthday Party", "Corporate Event", "Other"];
const STANDARD_DURATIONS = ["1 hr", "1.5 hr", "2 hr", "2.5 hr", "3 hr", "5 hr"];

export default function PricingCalculator() {
    // ── Pricing State ────────────────────────────────────────────────────────
    const [ensemble, setEnsemble] = useState("");
    const [duration, setDuration] = useState("");
    const [customHours, setCustomHours] = useState("");
    const [location, setLocation] = useState("");
    const [customLocation, setCustomLocation] = useState("");
    const [customSongs, setCustomSongs] = useState([]);
    const [audioSystem, setAudioSystem] = useState(false);
    const [micOfficiant, setMicOfficiant] = useState(false);
    const [recording, setRecording] = useState(false);

    // ── Event Info State ─────────────────────────────────────────────────────
    const [clientName, setClientName] = useState("");
    const [occasion, setOccasion] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [venueName, setVenueName] = useState("");
    const [outdoorIndoor, setOutdoorIndoor] = useState("");
    const [notes, setNotes] = useState("");
    const [clientEmail, setClientEmail] = useState("");

    // ── Submit State ─────────────────────────────────────────────────────────
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState("");

    // Check if location or occasion is "Other"
    const isOtherLocation = location === "Other";
    const isOtherOccasion = occasion === "Other";
    const needsManualQuote = isOtherLocation || isOtherOccasion;

    // Effective duration label
    const durationLabel = duration === "other"
        ? (customHours ? `${customHours} hr${parseFloat(customHours) !== 1 ? "s" : ""}` : "Custom")
        : duration;

    // Get all locations including "Other"
    const locations = ensemble ? Object.keys(zonePricing[ensemble] || {}) : Object.keys(zonePricing["String Solo"] || {});
    const ensembles = Object.keys(ensemblePricing);

    const [customOccasion, setCustomOccasion] = useState("");
    const [errors, setErrors] = useState({});

    const [expandedAddOn, setExpandedAddOn] = useState([]);

    // Reset function for "Submit Another Quote"
    const handleReset = () => {
        // Pricing State
        setEnsemble("");
        setDuration("");
        setCustomHours("");
        setLocation("");
        setCustomLocation("");
        setCustomSongs([]);
        setAudioSystem(false);
        setMicOfficiant(false);
        setRecording(false);

        // Event Info State
        setClientName("");
        setOccasion("");
        setEventDate("");
        setStartTime("");
        setEndTime("");
        setVenueName("");
        setOutdoorIndoor("");
        setNotes("");
        setClientEmail("");

        // Other State
        setCustomOccasion("");
        setErrors({});

        // Return to form
        setSubmitted(false);
    };

    /**
     * Calculate pricing based on selections
     */
    const { subtotal } = useMemo(() => {
        const locationReady = location && (location !== "Other" || customLocation.trim());
        const durationReady = duration && (duration !== "other" || (customHours && parseFloat(customHours) > 0));
        const ready = ensemble && durationReady && locationReady && !needsManualQuote;

        if (!ready) return { subtotal: 0, gst: 0, total: 0, lineItems: [] };

        let base;
        if (duration === "other") {
            const hrs = parseFloat(customHours);
            base = Math.round((ensembleHourlyRate[ensemble] || 0) * hrs);
        } else {
            base = ensemblePricing[ensemble][duration];
        }

        const travel = zonePricing[ensemble][location] ?? 0;
        const musicians = ensembleMusicians[ensemble] ?? 1;
        const audioSystemPrice = audioSystem ? musicians * AUDIO_SYSTEM_PER_MUSICIAN : 0;
        const customSongTotal = customSongs.length * CUSTOM_SONG_PRICE;
        const micPrice = micOfficiant ? MIC_OFFICIANT_PRICE : 0;
        const recordingPrice = recording ? RECORDING_PRICE : 0;

        const subtotal = base + travel + customSongTotal + audioSystemPrice + micPrice + recordingPrice;
        const gst = subtotal * GST;
        const total = subtotal + gst;

        const lineItems = [
            { label: `${ensemble} — ${durationLabel}`, val: base },
            ...(travel > 0 ? [{ label: `Travel (${location})`, val: travel }] : []),
            ...(customSongs.length > 0 ? [{ label: `Custom Song${customSongs.length > 1 ? "s" : ""} ×${customSongs.length}`, val: customSongTotal }] : []),
            ...(audioSystem ? [{ label: `Audio System (${musicians} musician${musicians > 1 ? "s" : ""})`, val: audioSystemPrice }] : []),
            ...(micOfficiant ? [{ label: "Mic for Officiant", val: MIC_OFFICIANT_PRICE }] : []),
            ...(recording ? [{ label: "Recording for Wedding Rehearsal/Video", val: RECORDING_PRICE }] : []),
        ];

        return { subtotal, gst, total, lineItems };
    }, [ensemble, duration, customHours, location, customLocation, customSongs, audioSystem, micOfficiant, recording, needsManualQuote, durationLabel]);

    /**
     * Handle form submission
     */
    const handleSubmit = async () => {
        if (!validateForm()) return;

        setSubmitting(true);
        setSubmitError("");

        try {
            console.log("📨 Sending email via EmailJS...");

            // Format email body
            const formattedDate = eventDate
                ? new Date(eventDate + "T00:00:00").toLocaleDateString("en-CA", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })
                : "—";

            const locationDisplay = location === "Other"
                ? `Other — ${customLocation || "unspecified"}`
                : location || "—";

            // Build pricing section based on whether manual quote is needed
            const pricingSection = needsManualQuote || duration === "other"
                ? `We'll review your details and get back to you shortly with a personalized quote.`
                : `TOTAL: ${fmt(subtotal)} + GST (5%)`;

            const emailBody = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLIENT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Event Date: ${formattedDate}
Start Time: ${startTime || "—"}
End Time: ${endTime || "—"}
Location: ${locationDisplay}
Venue: ${venueName || "—"}
Setting: ${outdoorIndoor || "—"}
Notes: ${notes || "—"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BOOKING DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ensemble: ${ensemble || "—"}
Duration: ${durationLabel || "—"}

${pricingSection}`;

            // Send email via EmailJS
            const response = await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
                {
                    to_email: clientEmail,
                    cc_email: "arietta.entertainment@gmail.com",
                    to_name: clientName,
                    from_name: "Arietta Entertainment",
                    subject: `Your Arietta Quote — ${customOccasion || occasion || "Event"}`,
                    message: emailBody,
                }
            );

            console.log("✅ Email sent successfully:", response);
            setSubmitted(true);
        } catch (error) {
            console.error("❌ Error sending email:", error);
            setSubmitError(error.message || "Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    // Show success screen after submission
    if (submitted) {
        return <SuccessScreen clientName={clientName} clientEmail={clientEmail} onReset={handleReset} />;
    }

    const validateEmail = (email) => {
        // Basic email validation: must have @ and be properly formatted
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        const requiredFields = {
            clientName: "First and Last Name",
            occasion: "Type of Occasion",
            eventDate: "Date of Event",
            startTime: "Start Time of Event",
            endTime: "End Time of Event",
            ensemble: "Ensemble",
            duration: "Booking Duration",
            location: "Event Location",
            venueName: "Venue Name & Address",
            outdoorIndoor: "Outdoor/Indoor",
            clientEmail: "Email",
        };

        const newErrors = {};

        // Check all required fields
        Object.keys(requiredFields).forEach(field => {
            if (!eval(field)) newErrors[field] = requiredFields[field];
        });

        // If email exists, also validate format (even if other fields are missing)
        if (clientEmail && !validateEmail(clientEmail)) {
            newErrors.clientEmail = "Invalid email format";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Main form
    return (
        <div style={{ minHeight: "100vh", background: "#f5f0e8", display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 20px" }}>
            <div style={{ textAlign: "center", marginBottom: "40px", maxWidth: 560 }}>
                <div style={{ fontSize: "11px", letterSpacing: "0.3em", color: "#b8956a", textTransform: "uppercase", marginBottom: "10px" }}>Music for Your Moment</div>
                {/* Change 1: Title to "ARIETTA" */}
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 6vw, 48px)", fontWeight: 700, color: "#3d2e1e", margin: 0, lineHeight: 1.15, letterSpacing: "0.15em" }}>ARIETTA</h1>
                <div style={{ width: 60, height: 1, background: "linear-gradient(90deg, transparent, #b8956a, transparent)", margin: "14px auto" }} />
                {/* Change 2: Subtitle updated */}
                <p style={{ color: "#8a7560", fontSize: "16px", fontStyle: "italic", fontWeight: 300, margin: 0, lineHeight: 1.7 }}>
                    Please complete the form below, and we'll be in touch shortly with a quote!
                </p>
            </div>

            <div style={{ width: "100%", maxWidth: 600, background: "#fff", borderRadius: "2px", boxShadow: "0 4px 40px rgba(61,46,30,0.08), 0 1px 4px rgba(61,46,30,0.05)", overflow: "hidden" }}>
                <div style={{ height: 4, background: "linear-gradient(90deg, #b8956a, #d4af7a, #b8956a)" }} />

                <div style={{ padding: "10px 36px 0" }}>

                    {/* ── About You ── */}
                    <div style={{ display: "flex", alignItems: "center", gap: "14px", margin: "30px 0 26px" }}>
                        <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, #e0d4c0)" }} />
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "12px", letterSpacing: "0.2em", color: "#b8956a", textTransform: "uppercase", whiteSpace: "nowrap" }}>About You</span>
                        <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, #e0d4c0, transparent)" }} />
                    </div>

                    <div style={{ marginBottom: "22px" }}>
                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", letterSpacing: "0.12em", color: "#b8956a", textTransform: "uppercase", marginBottom: "8px" }}>First and Last Name <span style={{ color: "#c0392b" }}>*</span></div>
                        <input
                            type="text"
                            value={clientName}
                            onChange={(e) => {
                                setClientName(e.target.value);
                                if (errors.clientName) {
                                    setErrors(prev => ({ ...prev, clientName: null }));
                                }
                            }}
                            placeholder="e.g. Jane Smith"
                            style={{ width: "100%", padding: "12px 16px", background: clientName ? "#fffdf9" : "#faf8f4", border: errors.clientName ? "2px solid #c0392b" : "1px solid #ddd0bb", borderRadius: "4px", fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: "#3d2e1e", outline: "none", boxSizing: "border-box" }}
                        />
                    </div>

                    <div style={{ marginBottom: "22px" }}>
                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", letterSpacing: "0.12em", color: "#b8956a", textTransform: "uppercase", marginBottom: "8px" }}>Type of Occasion <span style={{ color: "#c0392b" }}>*</span></div>
                        <select
                            value={occasion}
                            onChange={(e) => {
                                setOccasion(e.target.value);
                                if (errors.occasion) {
                                    setErrors(prev => ({ ...prev, occasion: null }));
                                }
                            }}
                            style={{ width: "100%", padding: "12px 16px", background: occasion ? "#fffdf9" : "#faf8f4", border: errors.occasion ? "2px solid #c0392b" : "1px solid #ddd0bb", borderRadius: "4px", fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: occasion ? "#3d2e1e" : "#b8a88a", outline: "none", boxSizing: "border-box", cursor: "pointer", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23b8956a' strokeWidth='1.5' fill='none' strokeLinecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", backgroundSize: "12px", paddingRight: "40px" }}>
                            <option value="" disabled>Select occasion…</option>
                            {OCCASIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>

                        {occasion === "Other" && (
                            <div style={{ marginTop: "10px" }}>
                                <input
                                    type="text"
                                    value={customOccasion}
                                    onChange={(e) => setCustomOccasion(e.target.value)}
                                    placeholder="Please specify your occasion…"
                                    style={{ width: "100%", padding: "12px 16px", background: customOccasion ? "#fffdf9" : "#faf8f4", border: "1px solid #ddd0bb", borderRadius: "4px", fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: "#3d2e1e", outline: "none", boxSizing: "border-box" }}
                                />
                            </div>
                        )}
                    </div>

                    {/* ── Event Details ── */}
                    <div style={{ display: "flex", alignItems: "center", gap: "14px", margin: "30px 0 26px" }}>
                        <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, #e0d4c0)" }} />
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "12px", letterSpacing: "0.2em", color: "#b8956a", textTransform: "uppercase", whiteSpace: "nowrap" }}>Event Details</span>
                        <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, #e0d4c0, transparent)" }} />
                    </div>

                    <div style={{ marginBottom: "22px" }}>
                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", letterSpacing: "0.12em", color: "#b8956a", textTransform: "uppercase", marginBottom: "8px" }}>Date of Event <span style={{ color: "#c0392b" }}>*</span></div>
                        <input
                            type="date"
                            value={eventDate}
                            onChange={(e) => {
                                setEventDate(e.target.value);
                                if (errors.eventDate) {
                                    setErrors(prev => ({ ...prev, eventDate: null }));
                                }
                            }}
                            min={new Date().toISOString().split('T')[0]}
                            className={`pricing-input-base ${eventDate ? "pricing-input-filled" : "pricing-input-empty"} ${errors.eventDate ? "pricing-input-error" : ""}`}
                            style={{ cursor: "pointer" }}
                        />

                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "22px" }}>
                        <div>
                            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", letterSpacing: "0.12em", color: "#b8956a", textTransform: "uppercase", marginBottom: "8px" }}>Start Time of Event <span style={{ color: "#c0392b" }}>*</span></div>
                            <select
                                value={startTime}
                                onChange={(e) => {
                                    setStartTime(e.target.value);
                                    if (errors.startTime) {
                                        setErrors(prev => ({ ...prev, startTime: null }));
                                    }
                                }}
                                style={{ width: "100%", padding: "12px 16px", background: startTime ? "#fffdf9" : "#faf8f4", border: errors.startTime ? "2px solid #c0392b" : "1px solid #ddd0bb", borderRadius: "4px", fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: startTime ? "#3d2e1e" : "#b8a88a", outline: "none", boxSizing: "border-box", cursor: "pointer", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23b8956a' strokeWidth='1.5' fill='none' strokeLinecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", backgroundSize: "12px", paddingRight: "40px" }}>
                                <option value="" disabled>Select time…</option>
                                {timeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div>
                            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", letterSpacing: "0.12em", color: "#b8956a", textTransform: "uppercase", marginBottom: "8px" }}>End Time of Event <span style={{ color: "#c0392b" }}>*</span></div>
                            <select
                                value={endTime}
                                onChange={(e) => {
                                    setEndTime(e.target.value);
                                    if (errors.endTime) {
                                        setErrors(prev => ({ ...prev, endTime: null }));
                                    }
                                }}
                                style={{ width: "100%", padding: "12px 16px", background: endTime ? "#fffdf9" : "#faf8f4", border: errors.endTime ? "2px solid #c0392b" : "1px solid #ddd0bb", borderRadius: "4px", fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: endTime ? "#3d2e1e" : "#b8a88a", outline: "none", boxSizing: "border-box", cursor: "pointer", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23b8956a' strokeWidth='1.5' fill='none' strokeLinecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", backgroundSize: "12px", paddingRight: "40px" }}>
                                <option value="" disabled>Select time…</option>
                                {timeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* ── Pricing ── */}
                    <div style={{ display: "flex", alignItems: "center", gap: "14px", margin: "30px 0 26px" }}>
                        <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, #e0d4c0)" }} />
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "12px", letterSpacing: "0.2em", color: "#b8956a", textTransform: "uppercase", whiteSpace: "nowrap" }}>Pricing</span>
                        <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, #e0d4c0, transparent)" }} />
                    </div>

                    {/* Step 1: Ensemble */}
                    <div style={{ marginBottom: "24px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #b8956a, #d4af7a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#fff", flexShrink: 0, fontFamily: "'Playfair Display', serif" }}>1</div>
                            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", letterSpacing: "0.08em", color: "#8a7560", textTransform: "uppercase" }}>Choose Your Ensemble <span style={{ color: "#c0392b" }}>*</span></span>
                        </div>
                        <select
                            value={ensemble}
                            onChange={(e) => {
                                setEnsemble(e.target.value);
                                if (errors.ensemble) {
                                    setErrors(prev => ({ ...prev, ensemble: null }));
                                }
                            }}
                            style={{ width: "100%", padding: "12px 16px", background: ensemble ? "#fffdf9" : "#faf8f4", border: errors.ensemble ? "2px solid #c0392b" : "1px solid #ddd0bb", borderRadius: "4px", fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: ensemble ? "#3d2e1e" : "#b8a88a", outline: "none", boxSizing: "border-box", cursor: "pointer", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23b8956a' strokeWidth='1.5' fill='none' strokeLinecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", backgroundSize: "12px", paddingRight: "40px" }}>
                            <option value="" disabled>Select ensemble type…</option>
                            {ensembles.map((e) => <option key={e} value={e}>{e}</option>)}
                        </select>

                    </div>

                    {/* Step 2: Booking Duration - Change 3: "Booking Duration" */}
                    <div style={{ marginBottom: "24px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #b8956a, #d4af7a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#fff", flexShrink: 0, fontFamily: "'Playfair Display', serif" }}>2</div>
                            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", letterSpacing: "0.08em", color: "#8a7560", textTransform: "uppercase" }}>Booking Duration <span style={{ color: "#c0392b" }}>*</span></span>
                        </div>
                        {/* Change 4: Duration buttons with "Other" option */}
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                            {STANDARD_DURATIONS.map((d) => (
                                <button
                                    key={d}
                                    onClick={() => {
                                        setDuration(d);
                                        setCustomHours("");
                                        if (errors.duration) {
                                            setErrors(prev => ({ ...prev, duration: null }));
                                        }
                                    }}
                                    style={{ padding: "9px 18px", border: duration === d ? "1.5px solid #3d2e1e" : "1.5px solid #ddd0bb", background: duration === d ? "#3d2e1e" : "#faf8f4", color: duration === d ? "#f5f0e8" : "#8a7560", borderRadius: "4px", cursor: "pointer", fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", transition: "all 0.15s" }}>
                                    {d}
                                </button>
                            ))}
                            <button
                                onClick={() => {
                                    setDuration("other");
                                    if (errors.duration) {
                                        setErrors(prev => ({ ...prev, duration: null }));
                                    }
                                }}
                                style={{ padding: "9px 18px", border: duration === "other" ? "1.5px solid #3d2e1e" : "1.5px solid #ddd0bb", background: duration === "other" ? "#3d2e1e" : "#faf8f4", color: duration === "other" ? "#f5f0e8" : "#8a7560", borderRadius: "4px", cursor: "pointer", fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", transition: "all 0.15s" }}>
                                Other
                            </button>
                        </div>

                        {duration === "other" && (
                            <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
                                <input
                                    type="number"
                                    min="0.5"
                                    step="0.5"
                                    value={customHours}
                                    onChange={(e) => setCustomHours(e.target.value)}
                                    placeholder="e.g. 4"
                                    style={{ width: "120px", padding: "12px 16px", background: customHours ? "#fffdf9" : "#faf8f4", border: "1px solid #ddd0bb", borderRadius: "4px", fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: "#3d2e1e", outline: "none", boxSizing: "border-box" }}
                                />
                                <span style={{ color: "#8a7560", fontSize: "16px" }}>hours</span>
                            </div>
                        )}
                    </div>

                    {/* Step 3: Event Location - Change 5: "Other" location option */}
                    <div style={{ marginBottom: location === "Other" ? "10px" : "24px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #b8956a, #d4af7a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#fff", flexShrink: 0, fontFamily: "'Playfair Display', serif" }}>3</div>
                            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", letterSpacing: "0.08em", color: "#8a7560", textTransform: "uppercase" }}>Event Location <span style={{ color: "#c0392b" }}>*</span></span>
                        </div>
                        <select
                            value={location}
                            onChange={(e) => {
                                setLocation(e.target.value);
                                setCustomLocation("");
                                if (errors.location) {
                                    setErrors(prev => ({ ...prev, location: null }));
                                }
                            }}

                            style={{ width: "100%", padding: "12px 16px", background: location ? "#fffdf9" : "#faf8f4", border: errors.location ? "2px solid #c0392b" : "1px solid #ddd0bb", borderRadius: "4px", fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: location ? "#3d2e1e" : "#b8a88a", outline: "none", boxSizing: "border-box", cursor: "pointer", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23b8956a' strokeWidth='1.5' fill='none' strokeLinecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", backgroundSize: "12px", paddingRight: "40px" }}>
                            <option value="" disabled>Select your city…</option>
                            {[...locations, "Other"].map((l) => <option key={l} value={l}>{l}</option>)}
                        </select>

                    </div>
                    {location === "Other" && (
                        <div style={{ marginBottom: "24px" }}>
                            <input
                                type="text"
                                value={customLocation}
                                onChange={(e) => setCustomLocation(e.target.value)}
                                placeholder="Please specify your location…"
                                style={{ width: "100%", padding: "12px 16px", background: customLocation ? "#fffdf9" : "#faf8f4", border: "1px solid #ddd0bb", borderRadius: "4px", fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: "#3d2e1e", outline: "none", boxSizing: "border-box" }}
                            />
                            <div style={{ marginTop: "8px", padding: "10px 14px", background: "#fdf8f0", border: "1px solid #e8d9c0", borderRadius: "4px", fontSize: "14px", color: "#8a7560", fontStyle: "italic" }}>
                                We'll follow up with a custom quote for your location.
                            </div>
                        </div>
                    )}

                    {/* Venue Name */}
                    <div style={{ marginBottom: "24px" }}>
                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", letterSpacing: "0.12em", color: "#b8956a", textTransform: "uppercase", marginBottom: "8px" }}>Venue Name &amp; Address <span style={{ color: "#c0392b" }}>*</span></div>
                        <input
                            type="text"
                            value={venueName}
                            onChange={(e) => {
                                setVenueName(e.target.value);
                                if (errors.venueName) {
                                    setErrors(prev => ({ ...prev, venueName: null }));
                                }
                            }}
                            placeholder="e.g. The Fairmont Hotel, 900 W Georgia St, Vancouver"
                            style={{ width: "100%", padding: "12px 16px", background: venueName ? "#fffdf9" : "#faf8f4", border: errors.venueName ? "2px solid #c0392b" : "1px solid #ddd0bb", borderRadius: "4px", fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: "#3d2e1e", outline: "none", boxSizing: "border-box" }}
                        />
                    </div>

                    {/* Outdoor / Indoor */}
                    <div style={{ marginBottom: "24px" }}>
                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", letterSpacing: "0.12em", color: "#b8956a", textTransform: "uppercase", marginBottom: "8px" }}>Is the event outdoor or indoor? <span style={{ color: "#c0392b" }}>*</span></div>
                        <div style={{ display: "flex", gap: "10px" }}>
                            {["Outdoor", "Indoor"].map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => {
                                        setOutdoorIndoor(opt);
                                        if (errors.outdoorIndoor) {
                                            setErrors(prev => ({ ...prev, outdoorIndoor: null }));
                                        }
                                    }}
                                    style={{ flex: 1, padding: "11px", border: outdoorIndoor === opt ? "1.5px solid #3d2e1e" : "1.5px solid #ddd0bb", background: outdoorIndoor === opt ? "#3d2e1e" : "#faf8f4", color: outdoorIndoor === opt ? "#f5f0e8" : "#8a7560", borderRadius: "4px", cursor: "pointer", fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", transition: "all 0.15s" }}>
                                    {opt}
                                </button>
                            ))}
                        </div>

                    </div>

                    {/* Step 4: Add-Ons */}
                    <div style={{ marginBottom: "24px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #b8956a, #d4af7a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#fff", flexShrink: 0, fontFamily: "'Playfair Display', serif" }}>4</div>
                            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", letterSpacing: "0.08em", color: "#8a7560", textTransform: "uppercase" }}>Add-Ons (Optional)</span>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

                            {/* Custom Songs - Expandable */}
                            <div style={{ marginBottom: "0" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <button
                                        onClick={() => setExpandedAddOn(prev =>
                                            prev.includes("Custom Songs")
                                                ? prev.filter(l => l !== "Custom Songs")
                                                : [...prev, "Custom Songs"]
                                        )}
                                        style={{
                                            padding: "12px 16px",
                                            border: customSongs.length > 0 ? "1.5px solid #3d2e1e" : "1.5px solid #ddd0bb",
                                            background: customSongs.length > 0 ? "#3d2e1e" : "#faf8f4",
                                            color: customSongs.length > 0 ? "#f5f0e8" : "#3d2e1e",
                                            borderRadius: expandedAddOn.includes("Custom Songs") ? "4px 4px 0 0" : "4px",
                                            cursor: "pointer",
                                            fontFamily: "'Cormorant Garamond', serif",
                                            fontSize: "16px",
                                            textAlign: "left",
                                            transition: "all 0.15s",
                                            flex: 1,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between"
                                        }}
                                    >
                                        <span>Custom Songs</span>
                                        <div
                                            style={{
                                                width: "28px",
                                                height: "28px",
                                                borderRadius: "50%",
                                                border: "1.5px solid #ddd0bb",
                                                background: expandedAddOn.includes("Custom Songs") ? "#3d2e1e" : "#faf8f4",
                                                color: expandedAddOn.includes("Custom Songs") ? "#f5f0e8" : "#8a7560",
                                                cursor: "pointer",
                                                fontSize: "16px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                transition: "all 0.15s",
                                                flexShrink: 0
                                            }}
                                        >
                                            {expandedAddOn.includes("Custom Songs") ? "✕" : "?"}
                                        </div>
                                    </button>
                                </div>
                                {expandedAddOn.includes("Custom Songs") && (
                                    <div style={{ marginTop: "0", padding: "12px", background: "#fffdf9", border: "1px solid #ddd0bb", borderRadius: "0 0 4px 4px", fontSize: "14px", color: "#8a7560", borderTop: "none" }}>
                                        <SongSearchSelector
                                            customSongs={customSongs}
                                            onCustomSongsChange={setCustomSongs}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Audio System, Mic for Officiant, Recording */}
                            {[
                                { label: "Audio System", active: audioSystem, toggle: () => setAudioSystem(!audioSystem), description: "High-quality speaker system for clear sound throughout your venue." },
                                { label: "Mic for Officiant", active: micOfficiant, toggle: () => setMicOfficiant(!micOfficiant), description: "Wireless microphone for the officiant to be heard clearly." },
                                { label: "Recording for Wedding Rehearsal/Video", active: recording, toggle: () => setRecording(!recording), description: "Professional audio and video recording of your event." },
                            ].map(({ label, active, toggle, description }) => (
                                <div key={label} style={{ marginBottom: "0" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: expandedAddOn.includes(label) ? "0" : "0" }}>
                                        <button
                                            onClick={toggle}
                                            style={{
                                                padding: "12px 16px",
                                                border: active ? "1.5px solid #3d2e1e" : "1.5px solid #ddd0bb",
                                                background: active ? "#3d2e1e" : "#faf8f4",
                                                color: active ? "#f5f0e8" : "#3d2e1e",
                                                borderRadius: expandedAddOn.includes(label) ? "4px 4px 0 0" : "4px",
                                                cursor: "pointer",
                                                fontFamily: "'Cormorant Garamond', serif",
                                                fontSize: "16px",
                                                textAlign: "left",
                                                transition: "all 0.15s",
                                                flex: 1,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between"
                                            }}
                                        >
                                            <span>{label}</span>
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setExpandedAddOn(prev =>
                                                        prev.includes(label)
                                                            ? prev.filter(l => l !== label)
                                                            : [...prev, label]
                                                    );
                                                }}
                                                style={{
                                                    width: "28px",
                                                    height: "28px",
                                                    borderRadius: "50%",
                                                    border: "1.5px solid #ddd0bb",
                                                    background: expandedAddOn.includes(label) ? "#3d2e1e" : "#faf8f4",
                                                    color: expandedAddOn.includes(label) ? "#f5f0e8" : "#8a7560",
                                                    cursor: "pointer",
                                                    fontSize: "16px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    transition: "all 0.15s",
                                                    flexShrink: 0
                                                }}
                                            >
                                                {expandedAddOn.includes(label) ? "✕" : "?"}
                                            </div>
                                        </button>
                                    </div>
                                    {expandedAddOn.includes(label) && (
                                        <div style={{ marginTop: "0", padding: "12px", background: "#fffdf9", border: "1px solid #ddd0bb", borderRadius: "0 0 4px 4px", fontSize: "14px", color: "#8a7560", borderTop: "none" }}>
                                            {description}
                                        </div>
                                    )}
                                </div>
                            ))}

                        </div>
                    </div>

                    {/* Additional Notes */}
                    <div style={{ marginBottom: "10px" }}>
                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", letterSpacing: "0.12em", color: "#b8956a", textTransform: "uppercase", marginBottom: "8px" }}>Any additional information about your event?</div>
                        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Please let us know if there are any other details regarding your event…" rows={4} style={{ width: "100%", padding: "12px 16px", background: notes ? "#fffdf9" : "#faf8f4", border: "1px solid #ddd0bb", borderRadius: "4px", fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: "#3d2e1e", outline: "none", boxSizing: "border-box", resize: "vertical", lineHeight: 1.6 }} />
                    </div>

                    {/* ── Get Your Quote ── */}
                    <div style={{ display: "flex", alignItems: "center", gap: "14px", margin: "30px 0 26px" }}>
                        <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, #e0d4c0)" }} />
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "12px", letterSpacing: "0.2em", color: "#b8956a", textTransform: "uppercase", whiteSpace: "nowrap" }}>Get Your Quote</span>
                        <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, #e0d4c0, transparent)" }} />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", letterSpacing: "0.12em", color: "#b8956a", textTransform: "uppercase", marginBottom: "8px" }}>E-mail Me a Quote</div>
                        <input
                            type="email"
                            value={clientEmail}
                            onChange={(e) => {
                                setClientEmail(e.target.value);
                                // Clear error when user starts typing
                                if (errors.clientEmail) {
                                    setErrors(prev => ({ ...prev, clientEmail: null }));
                                }
                            }}
                            placeholder="your@email.com"
                            style={{
                                width: "100%",
                                padding: "12px 16px",
                                background: clientEmail ? "#fffdf9" : "#faf8f4",
                                border: errors.clientEmail ? "2px solid #c0392b" : "1px solid #ddd0bb",
                                borderRadius: "4px",
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: "16px",
                                color: "#3d2e1e",
                                outline: "none",
                                boxSizing: "border-box",
                                transition: "border-color 0.2s"
                            }}
                        />

                        {errors.clientEmail && (
                            <p style={{ color: "#c0392b", fontSize: "12px", marginTop: "6px", margin: "6px 0 0" }}>
                                {errors.clientEmail}
                            </p>
                        )}
                    </div>

                </div>

                {/* Submit */}
                <div style={{ padding: "4px 36px 36px" }}>
                    {submitError && <p style={{ color: "#c0392b", fontSize: "14px", fontStyle: "italic", marginBottom: "12px", textAlign: "center" }}>{submitError}</p>}
                    {Object.keys(errors).length > 0 && Object.values(errors).some(err => err) && (
                        <div style={{ background: "#fdf8f0", border: "1px solid #e8d9c0", borderRadius: "4px", padding: "12px", marginBottom: "16px", fontSize: "14px", color: "#c0392b" }}>
                            <strong>Please fill out the following required fields:</strong>
                            <ul style={{ margin: "8px 0 0", paddingLeft: "20px" }}>
                                {Object.values(errors).filter(err => err).map((err) => <li key={err}>{err}</li>)}
                            </ul>
                        </div>
                    )}

                    <button
                        onClick={handleSubmit}
                        disabled={submitting || !clientEmail}
                        style={{
                            width: "100%", padding: "16px",
                            background: !clientEmail ? "#c9bfaf" : "#3d2e1e",
                            color: "#f5f0e8", border: "none", borderRadius: "4px",
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "18px", fontStyle: "italic",
                            cursor: !clientEmail ? "not-allowed" : "pointer",
                            letterSpacing: "0.03em", transition: "background 0.2s",
                        }}
                    >
                        {submitting ? "Sending…" : "Submit & Send My Quote"}
                    </button>
                    {/* Change 8: GST shown separately */}
                    <p style={{ color: "#b8a88a", fontSize: "12px", textAlign: "center", marginTop: "12px", marginBottom: 0, fontStyle: "italic" }}>
                        A copy of this quote will be sent to your email · All prices in CAD · GST not included
                    </p>
                </div>
            </div>

            <p style={{ color: "#b8a88a", fontSize: "13px", marginTop: "28px", fontStyle: "italic", textAlign: "center" }}>
                Prices are estimates — we'll be in touch to confirm availability.
            </p>
        </div>
    );
}