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
import PricingForm from "./PricingForm";
import SuccessScreen from "./SuccessScreen";

// Initialize EmailJS once
if (typeof window !== "undefined") {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
}

export default function PricingCalculator() {
    // ── Pricing State ────────────────────────────────────────────────────────
    const [ensemble, setEnsemble] = useState("");
    const [duration, setDuration] = useState("");
    const [location, setLocation] = useState("");
    const [customSongs, setCustomSongs] = useState(0);
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

    /**
     * Calculate pricing based on selections
     * Memoized to prevent unnecessary recalculations
     */
    const { subtotal, gst, total, lineItems } = useMemo(() => {
        const ready = ensemble && duration && location;
        if (!ready) return { ready: false, subtotal: 0, gst: 0, total: 0, lineItems: [] };

        const base = ensemblePricing[ensemble][duration];
        const travel = zonePricing[ensemble][location];
        const musicians = ensembleMusicians[ensemble] ?? 1;
        const audioSystemPrice = audioSystem ? musicians * AUDIO_SYSTEM_PER_MUSICIAN : 0;
        const customSongTotal = customSongs * CUSTOM_SONG_PRICE;
        const micPrice = micOfficiant ? MIC_OFFICIANT_PRICE : 0;
        const recordingPrice = recording ? RECORDING_PRICE : 0;

        const subtotal = base + travel + customSongTotal + audioSystemPrice + micPrice + recordingPrice;
        const gst = subtotal * GST;
        const total = subtotal + gst;

        const lineItems = [
            { label: `${ensemble} — ${duration}`, val: base },
            ...(travel > 0 ? [{ label: `Travel (${location})`, val: travel }] : []),
            ...(customSongs > 0 ? [{ label: `Custom Song${customSongs > 1 ? "s" : ""} ×${customSongs}`, val: customSongTotal }] : []),
            ...(audioSystem ? [{ label: `Audio System (${musicians} musician${musicians > 1 ? "s" : ""})`, val: audioSystemPrice }] : []),
            ...(micOfficiant ? [{ label: "Mic for Officiant", val: MIC_OFFICIANT_PRICE }] : []),
            ...(recording ? [{ label: "Recording", val: RECORDING_PRICE }] : []),
        ];

        return { ready, subtotal, gst, total, lineItems };
    }, [ensemble, duration, location, customSongs, audioSystem, micOfficiant, recording]);

    /**
     * Handle form submission
     * Sends quote via EmailJS directly from the client
     */
    const handleSubmit = async () => {
        if (!clientEmail) return;

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

            const breakdownRows = lineItems.map(({ label, val }) => `  ${label}: ${fmt(val)}`).join("\n");

            const emailBody = `Hi ${clientName || "there"},

Thank you for your inquiry with Arietta Entertainment! Here is a summary of your quote:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLIENT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Event Date: ${formattedDate}
Start Time: ${startTime || "—"}
End Time: ${endTime || "—"}
Location: ${location || "—"}
Venue: ${venueName || "—"}
Notes: ${notes || "—"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRICING SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${breakdownRows}

Subtotal: ${fmt(subtotal)}
GST (5%): ${fmt(gst)}
TOTAL: ${fmt(total)}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

We will be in touch shortly to confirm your booking.

Warm regards,
Arietta Entertainment`;

            // Send email via EmailJS
            const response = await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
                {
                    to_email: clientEmail,
                    to_name: clientName,
                    from_name: "Arietta Entertainment",
                    subject: `Your Arietta Quote — ${occasion || "Event"}`,
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
        return <SuccessScreen clientName={clientName} clientEmail={clientEmail} />;
    }

    // Main form
    return (
        <PricingForm
            // Pricing state
            ensemble={ensemble}
            setEnsemble={setEnsemble}
            duration={duration}
            setDuration={setDuration}
            location={location}
            setLocation={setLocation}
            customSongs={customSongs}
            setCustomSongs={setCustomSongs}
            audioSystem={audioSystem}
            setAudioSystem={setAudioSystem}
            micOfficiant={micOfficiant}
            setMicOfficiant={setMicOfficiant}
            recording={recording}
            setRecording={setRecording}
            // Event info state
            clientName={clientName}
            setClientName={setClientName}
            occasion={occasion}
            setOccasion={setOccasion}
            eventDate={eventDate}
            setEventDate={setEventDate}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            venueName={venueName}
            setVenueName={setVenueName}
            outdoorIndoor={outdoorIndoor}
            setOutdoorIndoor={setOutdoorIndoor}
            notes={notes}
            setNotes={setNotes}
            clientEmail={clientEmail}
            setClientEmail={setClientEmail}
            // Pricing calculations
            subtotal={subtotal}
            gst={gst}
            total={total}
            lineItems={lineItems}
            // Form submission
            onSubmit={handleSubmit}
            submitting={submitting}
            submitError={submitError}
        />
    );
}