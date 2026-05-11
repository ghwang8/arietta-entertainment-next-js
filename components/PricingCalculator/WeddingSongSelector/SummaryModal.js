/**
 * Summary Modal Component
 * Displays selected songs and allows editing, with email submission
 */

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useRouter } from "next/router";

// Initialize EmailJS once
if (typeof window !== "undefined") {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
}

export default function SummaryModal({
                                         showSummary,
                                         onClose,
                                         visibleMoments,
                                         selections,
                                         customSongs,
                                         onSelectionsChange,
                                         onRemoveCustomSong,
                                         customerEmail: initialEmail = "",
                                         onEmailSubmit = null
                                     }) {
    const [customerEmail, setCustomerEmail] = useState(initialEmail);
    const [emailStatus, setEmailStatus] = useState(null); // "sending", "invalid", "error"
    const router = useRouter();

    if (!showSummary) return null;

    const removeSong = (momentKey, songId) => {
        const updated = selections[momentKey].filter(s => s.id !== songId);
        onSelectionsChange({
            ...selections,
            [momentKey]: updated
        });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const buildSummaryContent = () => {
        let summaryContent = "";
        let momentIndex = 1;

        visibleMoments.forEach(m => {
            const list = selections[m.key] || [];
            const customList = customSongs[m.key] || [];
            const allSongs = [...list, ...customList.map((s, idx) => ({ ...s, isCustom: true, customIdx: idx }))];

            if (allSongs.length > 0) {
                summaryContent += `${momentIndex}. ${m.label.toUpperCase()}\n`;
                summaryContent += "─".repeat(40) + "\n";
                allSongs.forEach(s => {
                    const customTag = s.isCustom ? " (custom)" : "";
                    summaryContent += `• ${s.name || s.title} by ${s.artist}${customTag}\n`;
                });
                summaryContent += "\n";
                momentIndex++;
            }
        });
        return summaryContent;
    };

    const handleEmailSubmit = async () => {
        if (!customerEmail.trim()) {
            setEmailStatus("invalid");
            return;
        }

        if (!validateEmail(customerEmail)) {
            setEmailStatus("invalid");
            return;
        }

        setEmailStatus("sending");

        try {
            const summaryContent = buildSummaryContent();
            const emailBody = `Thank you for using our Wedding Song Selector!\n\nHere is your selected music programme:\n\n${summaryContent}`;

            // Send email via EmailJS
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
                {
                    to_email: customerEmail,
                    cc_email: "arietta.entertainment@gmail.com",
                    to_name: "Customer",
                    from_name: "Arietta Entertainment",
                    subject: `Wedding Song Selector for ${customerEmail}`,
                    message: emailBody,
                }
            );

            // Redirect to success page
            router.push("/wedding-song-selector-success");
        } catch (error) {
            console.error("❌ Error sending email:", error);
            setEmailStatus("error");
        }
    };

    const isEmailValid = customerEmail.trim() ? validateEmail(customerEmail) : false;
    const isEmailEmpty = !customerEmail.trim();

    return (
        <div
            className="summary-overlay"
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(44,36,21,0.6)",
                zIndex: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px"
            }}
        >
            <div
                className="summary-card fade-in"
                onClick={e => e.stopPropagation()}
                style={{
                    background: "#faf7f2",
                    borderRadius: 12,
                    maxWidth: 680,
                    width: "100%",
                    maxHeight: "85vh",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
                }}
            >

                {/* Fixed Header with X Button */}
                <div style={{
                    position: "sticky",
                    top: 0,
                    background: "#faf7f2",
                    borderBottom: "1px solid #e8dfc8",
                    padding: "40px 40px 0",
                    zIndex: 10,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <div style={{ textAlign: "center", flex: 1 }}>
                        <div style={{
                            fontSize: 10,
                            letterSpacing: "0.35em",
                            color: "#c8a96e",
                            fontFamily: "'Cinzel', serif",
                            marginBottom: 8
                        }}>
                            YOUR SELECTIONS
                        </div>
                        <h2 style={{
                            margin: 0,
                            fontWeight: 300,
                            fontStyle: "italic",
                            fontSize: 32,
                            color: "#2c2415"
                        }}>
                            Music Programme
                        </h2>
                        <div style={{
                            width: 60,
                            height: 1,
                            background: "#c8a96e",
                            margin: "16px auto 0"
                        }}></div>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: "none",
                            border: "none",
                            color: "#a8956a",
                            cursor: "pointer",
                            fontSize: 32,
                            lineHeight: 1,
                            padding: 0,
                            marginTop: 8
                        }}
                    >
                        ×
                    </button>
                </div>

                {/* Scrollable Content */}
                <div style={{ overflowY: "auto", flex: 1, padding: "32px 40px" }}>
                    {visibleMoments.map((m, idx) => {
                        const list = selections[m.key] || [];
                        const customList = customSongs[m.key] || [];
                        const allSongs = [...list, ...customList.map((s, idxCustom) => ({ ...s, isCustom: true, customIdx: idxCustom }))];

                        if (allSongs.length === 0) return null;

                        return (
                            <div key={m.key} style={{ marginBottom: 24 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                    <span style={{ color: "#c8a96e", fontSize: 16 }}>{m.icon}</span>
                                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: "0.15em", color: "#6a5530" }}>
                                        {idx + 1}. {m.label.toUpperCase()}
                                        {m.key === "signing_song" && <span style={{ color: "#b8a080", fontStyle: "italic", fontSize: 10, marginLeft: 4 }}>(optional)</span>}
                                    </div>
                                </div>
                                <div style={{ height: 1, background: "#ece6d8", marginBottom: 12 }}></div>
                                {allSongs.map((s, songIdx) => (
                                    <div
                                        key={s.id || songIdx}
                                        style={{
                                            fontSize: 14,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            background: "#fdf6e8",
                                            padding: "10px 12px",
                                            marginBottom: 6,
                                            borderRadius: 6
                                        }}
                                    >
                                        <div>
                                            <span style={{ fontWeight: 500 }}>• {s.name || s.title}</span>
                                            <span style={{ color: "#a8956a", marginLeft: 8 }}>by {s.artist}</span>
                                            {s.isCustom && <span style={{ color: "#c8a96e", marginLeft: 8, fontSize: 12 }}>(custom)</span>}
                                        </div>
                                        <button
                                            onClick={() => s.isCustom ? onRemoveCustomSong(m.key, s.customIdx) : removeSong(m.key, s.id)}
                                            style={{
                                                background: "none",
                                                border: "none",
                                                color: "#c0392b",
                                                cursor: "pointer",
                                                fontSize: 18,
                                                padding: "0 8px",
                                                lineHeight: 1
                                            }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                                {m.key !== "after_ceremony" && <div style={{ height: 1, background: "#ece6d8", marginTop: 16 }}></div>}
                            </div>
                        );
                    })}
                </div>

                {/* Email Summary Section - Styled */}
                <div style={{ marginTop: 28, padding: "24px", background: "#f5efe3", borderRadius: 10, border: "1px solid #e8dfc8", margin: "0 32px 32px" }}>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "0.2em", color: "#6a5530", marginBottom: 12, textAlign: "center" }}>✉ EMAIL THIS SUMMARY</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <input
                            value={customerEmail}
                            onChange={(e) => {
                                setCustomerEmail(e.target.value);
                                setEmailStatus(null);
                            }}
                            placeholder="Your email address"
                            style={{
                                flex: "1 1 200px",
                                padding: "10px 14px",
                                border: emailStatus === "invalid" && customerEmail.trim() ? "2px solid #c0392b" : "1px solid #ddd0b5",
                                borderRadius: 6,
                                fontSize: 14,
                                fontFamily: "'Cormorant Garamond', serif",
                                outline: "none",
                                color: "#2c2415",
                                background: "#fff",
                                transition: "border-color 0.2s"
                            }}
                        />
                        <button
                            onClick={handleEmailSubmit}
                            disabled={emailStatus === "sending" || isEmailEmpty || !isEmailValid}
                            style={{
                                padding: "10px 20px",
                                background: (isEmailEmpty || !isEmailValid) ? "#c9bfaf" : "#2c2415",
                                border: "none",
                                borderRadius: 6,
                                color: "#c8a96e",
                                fontFamily: "'Cinzel', serif",
                                fontSize: 11,
                                letterSpacing: "0.1em",
                                cursor: (isEmailEmpty || !isEmailValid || emailStatus === "sending") ? "not-allowed" : "pointer",
                                whiteSpace: "nowrap",
                                transition: "all 0.2s",
                                opacity: (isEmailEmpty || !isEmailValid) ? 0.5 : 1
                            }}
                        >
                            {emailStatus === "sending" ? "PREPARING…" : "SEND SUMMARY"}
                        </button>
                    </div>
                    {emailStatus === "invalid" && customerEmail.trim() && <div style={{ color: "#a05050", fontSize: 12, marginTop: 8 }}>Please enter a valid email address.</div>}
                    {emailStatus === "error" && <div style={{ color: "#a05050", fontSize: 12, marginTop: 8 }}>Something went wrong. Please try again.</div>}
                    {!emailStatus && <div style={{ color: "#a8956a", fontSize: 12, marginTop: 8 }}>A copy will also be sent to Arietta Entertainment.</div>}
                </div>
            </div>
        </div>
    );
}