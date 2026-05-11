/**
 * Wedding Song Selector Component
 * Allows clients to select songs for different moments of their wedding
 */

import { useState, useMemo } from "react";
import { useRouter } from "next/router";
import emailjs from "@emailjs/browser";
import { MOMENTS, CEREMONY_MOMENTS } from "./constants";
import { useSongData } from "./useSongData";
import { useSongFiltering } from "./useSongFiltering";
import MomentButton from "./MomentButton";
import SongList from "./SongList";
import SummaryModal from "./SummaryModal";

// Initialize EmailJS once
if (typeof window !== "undefined") {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
}

export default function WeddingSongSelector({ selections = {}, onSelectionsChange = () => {} }) {
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("alpha");
    const [filterGenre, setFilterGenre] = useState("All");
    const [activeMoment, setActiveMoment] = useState(null);
    const [showSummary, setShowSummary] = useState(false);
    const [customSongs, setCustomSongs] = useState({});
    const [summaryEmail, setSummaryEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const allSongs = useSongData();
    const filtered = useSongFiltering(allSongs, search, sortBy, filterGenre);

    const visibleMoments = useMemo(() => MOMENTS, []);

    const toggleSong = (song) => {
        if (!activeMoment) return;
        const current = selections[activeMoment] || [];
        const exists = current.find(s => s.id === song.id);
        const updated = exists
            ? current.filter(s => s.id !== song.id)
            : [...current, song];

        onSelectionsChange({
            ...selections,
            [activeMoment]: updated
        });
    };

    const isSelected = (song) => {
        if (!activeMoment) return false;
        return (selections[activeMoment] || []).some(s => s.id === song.id);
    };

    const momentOf = (song) => {
        for (const m of visibleMoments) {
            if ((selections[m.key] || []).some(s => s.id === song.id)) return m;
        }
        return null;
    };

    const addCustomSong = (momentKey) => {
        setCustomSongs(prev => ({
            ...prev,
            [momentKey]: [...(prev[momentKey] || []), { name: "", artist: "" }]
        }));
    };

    const removeCustomSong = (momentKey, index) => {
        setCustomSongs(prev => ({
            ...prev,
            [momentKey]: prev[momentKey].filter((_, i) => i !== index)
        }));
    };

    const updateCustomSong = (momentKey, index, field, value) => {
        setCustomSongs(prev => {
            const updated = [...prev[momentKey]];
            updated[index] = { ...updated[index], [field]: value };
            return { ...prev, [momentKey]: updated };
        });
    };

    const totalSelected = visibleMoments.reduce((acc, m) => {
        const libraryCount = (selections[m.key] || []).length;
        const customCount = (customSongs[m.key] || []).length;
        return acc + libraryCount + customCount;
    }, 0);

    const genres = ["All", "Classical", "Film & Musical", "Disney", "Pop & Contemporary"];

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = summaryEmail.trim() ? emailRegex.test(summaryEmail) : false;

    // Build summary content
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

    // Handle main page send summary
    const handleMainPageSendSummary = async () => {
        if (!isEmailValid) return;

        setIsSubmitting(true);

        try {
            const summaryContent = buildSummaryContent();
            const emailBody = `Thank you for using our Wedding Song Selector!\n\nHere is your selected music programme:\n\n${summaryContent}`;

            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAILJS_WEDDING_SONG_SELECTOR_TEMPLATE_ID,
                {
                    to_email: summaryEmail,
                    cc_email: "arietta.entertainment@gmail.com",
                    to_name: "Customer",
                    from_name: "Arietta Entertainment",
                    subject: `Wedding Song Selector for ${summaryEmail}`,
                    message: emailBody,
                }
            );

            // Redirect to success page
            router.push("/wedding-song-selector-success");
        } catch (error) {
            console.error("❌ Error sending email:", error);
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ minHeight: "auto", background: "transparent" }}>
            {/* Wedding Song Selection with View and Edit Summary Button */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", letterSpacing: "0.08em", color: "#8a7560", textTransform: "uppercase" }}>Wedding Song Selection</span>
                </div>
                <button
                    onClick={() => setShowSummary(true)}
                    disabled={totalSelected === 0}
                    style={{
                        background: "#c8a96e",
                        color: "#fff",
                        padding: "10px 20px",
                        borderRadius: 6,
                        border: "none",
                        fontFamily: "'Cinzel', serif",
                        fontSize: 12,
                        letterSpacing: "0.1em",
                        cursor: totalSelected === 0 ? "not-allowed" : "pointer",
                        opacity: totalSelected === 0 ? 0.4 : 1,
                        transition: "all 0.2s ease"
                    }}>
                    VIEW AND EDIT SUMMARY ({totalSelected})
                </button>
            </div>

            {/* Moment Selector */}
            <div style={{ border: "1px solid #e0d5c0", borderRadius: 10, padding: "20px 16px", marginBottom: 20, background: "#fdf9f2" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.3em", color: "#a8956a", marginBottom: 14, fontFamily: "'Cinzel', serif", textAlign: "center" }}>SELECT A MOMENT TO ASSIGN SONGS</div>

                {/* Pre-Ceremony */}
                <div style={{ marginBottom: 10 }}>
                    <MomentButton moment={MOMENTS[0]} active={activeMoment === MOMENTS[0].key} count={(selections[MOMENTS[0].key] || []).length + (customSongs[MOMENTS[0].key] || []).length} onClick={() => setActiveMoment(activeMoment === MOMENTS[0].key ? null : MOMENTS[0].key)} />
                </div>

                {/* Ceremony group */}
                <div style={{ border: "1px solid #e0d5c0", borderRadius: 10, padding: "14px 16px", marginBottom: 10, background: "#fff" }}>
                    <div style={{ fontSize: 9, letterSpacing: "0.3em", color: "#b8956a", marginBottom: 12, fontFamily: "'Cinzel", textAlign: "center" }}>CEREMONY</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 8 }}>
                        {visibleMoments.filter(m => CEREMONY_MOMENTS.includes(m.key)).map(m => (
                            <MomentButton key={m.key} moment={m} active={activeMoment === m.key} count={(selections[m.key] || []).length + (customSongs[m.key] || []).length} onClick={() => setActiveMoment(activeMoment === m.key ? null : m.key)} />
                        ))}
                    </div>
                </div>

                {/* After Ceremony */}
                <MomentButton moment={MOMENTS[5]} active={activeMoment === MOMENTS[5].key} count={(selections[MOMENTS[5].key] || []).length + (customSongs[MOMENTS[5].key] || []).length} onClick={() => setActiveMoment(activeMoment === MOMENTS[5].key ? null : MOMENTS[5].key)} />
            </div>

            {activeMoment && (
                <div style={{ background: "#fdf6e8", border: "1px solid #e8d9b5", borderRadius: 8, padding: "10px 16px", marginBottom: 16, fontSize: 13, color: "#7a6030", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 16 }}>{visibleMoments.find(m => m.key === activeMoment)?.icon}</span>
                    <span>Click any song to add it to <strong>{visibleMoments.find(m => m.key === activeMoment)?.label}</strong></span>
                    <button onClick={() => setActiveMoment(null)} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "#a8956a", fontSize: 18, lineHeight: 1 }}>×</button>
                </div>
            )}

            {/* Controls */}
            <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search songs or artists…"
                    style={{ flex: "1 1 220px", padding: "10px 16px", border: "1px solid #ddd0b5", borderRadius: 8, fontSize: 14, background: "#fff", fontFamily: "'Cormorant Garamond', serif", outline: "none", color: "#2c2415" }}
                />
                <div style={{ display: "flex", gap: 4, background: "#f0ebe0", borderRadius: 8, padding: 4 }}>
                    {[["alpha","A–Z Title"],["singer","By Artist"],["genre","By Genre"]].map(([val, label]) => (
                        <button key={val} className="sort-btn" onClick={() => setSortBy(val)} style={{ padding: "6px 14px", borderRadius: 6, fontSize: 12, fontFamily: "'Cinzel', serif", letterSpacing: "0.05em", background: sortBy === val ? "#c8a96e" : "transparent", color: sortBy === val ? "#fff" : "#7a6030" }}>
                            {label}
                        </button>
                    ))}
                </div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {genres.map(g => (
                        <button key={g} className="sort-btn" onClick={() => setFilterGenre(g)} style={{ padding: "6px 12px", borderRadius: 20, fontSize: 11, fontFamily: "'Cinzel', serif", letterSpacing: "0.04em", border: "1px solid", borderColor: filterGenre === g ? "#c8a96e" : "#ddd0b5", background: filterGenre === g ? "#c8a96e" : "transparent", color: filterGenre === g ? "#fff" : "#7a6030" }}>
                            {g}
                        </button>
                    ))}
                </div>
            </div>

            {/* Song count */}
            <div style={{ fontSize: 12, color: "#a8956a", marginBottom: 12, fontFamily: "'Cinzel', serif", letterSpacing: "0.08em" }}>
                {filtered.length} SONG{filtered.length !== 1 ? "S" : ""} {totalSelected > 0 && `— ${totalSelected} SELECTED`}
            </div>

            {/* Fixed Header and Custom Songs Section */}
            <div style={{ marginBottom: 20 }}>
                {/* Fixed Header */}
                <div style={{ display: "flex", padding: "10px 20px", background: "#f5efe3", borderBottom: "1px solid #e8dfc8", fontSize: 10, letterSpacing: "0.2em", color: "#a8956a", fontFamily: "'Cinzel', serif", justifyContent: "space-between", alignItems: "center", borderRadius: "10px 10px 0 0" }}>
                    <div style={{ flex: 1 }}>TITLE</div>
                    <div style={{ flex: 0.8, textAlign: "left" }}>ARTIST</div>
                    <div style={{ flex: 0.6, textAlign: "left" }}>GENRE</div>
                    <div style={{ flex: 0.6, textAlign: "right" }}>ASSIGNED TO</div>
                </div>

                {/* Song List - Scrollable Container */}
                <div style={{ maxHeight: "450px", overflowY: "auto", border: "1px solid #e8dfc8", borderRadius: "0 0 10px 10px", background: "#fff", marginBottom: 20 }}>
                    <SongList
                        songs={allSongs}
                        filtered={filtered}
                        activeMoment={activeMoment}
                        isSelected={isSelected}
                        momentOf={momentOf}
                        toggleSong={toggleSong}
                        selections={selections}
                    />
                </div>
            </div>

            {/* Custom Songs Section */}
            <div style={{ background: "#fdf9f2", border: "1px solid #e0d5c0", borderRadius: 10, padding: "16px", marginBottom: (customSongs[activeMoment] || []).length > 0 ? 20 : 0, opacity: activeMoment ? 1 : 0.4, transition: "opacity 0.2s ease", pointerEvents: activeMoment ? "auto" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: (customSongs[activeMoment] || []).length > 0 ? 16 : 0 }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", letterSpacing: "0.08em", color: "#8a7560", textTransform: "uppercase" }}>Custom Songs</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", color: "#3d2e1e", minWidth: "20px", textAlign: "center" }}>{(customSongs[activeMoment] || []).length}</span>
                        <button onClick={() => activeMoment && addCustomSong(activeMoment)} style={{ width: 28, height: 28, borderRadius: "50%", border: "1.5px solid #ddd0bb", background: "#3d2e1e", color: "#f5f0e8", cursor: activeMoment ? "pointer" : "not-allowed", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>+</button>
                    </div>
                </div>

                {/* Custom Song Inputs */}
                {activeMoment && (customSongs[activeMoment] || []).map((song, idx) => (
                    <div key={idx} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "center" }}>
                        <span style={{ fontSize: 18, color: "#c8a96e", flexShrink: 0 }}>•</span>
                        <div style={{ flex: 1, display: "flex", gap: 12, alignItems: "center" }}>
                            <input
                                type="text"
                                value={song.name}
                                onChange={(e) => updateCustomSong(activeMoment, idx, "name", e.target.value)}
                                placeholder="Insert song name"
                                style={{ flex: 1, padding: "10px 12px", border: "1px solid #ddd0b5", borderRadius: 6, fontSize: 14, fontFamily: "'Cormorant Garamond', serif", outline: "none", color: "#2c2415", background: "#fff" }}
                            />
                            <input
                                type="text"
                                value={song.artist}
                                onChange={(e) => updateCustomSong(activeMoment, idx, "artist", e.target.value)}
                                placeholder="Song author"
                                style={{ flex: 1, padding: "10px 12px", border: "1px solid #ddd0b5", borderRadius: 6, fontSize: 14, fontFamily: "'Cormorant Garamond', serif", outline: "none", color: "#2c2415", background: "#fff" }}
                            />
                            <button
                                onClick={() => removeCustomSong(activeMoment, idx)}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "#c0392b",
                                    cursor: "pointer",
                                    fontSize: 18,
                                    padding: "0 8px",
                                    lineHeight: 1,
                                    flexShrink: 0
                                }}
                            >
                                ×
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Email Summary - Bottom Section */}
            <div style={{ marginTop: 28, padding: "24px", background: "#f5efe3", borderRadius: 10, border: "1px solid #e8dfc8" }}>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "0.2em", color: "#6a5530", marginBottom: 12, textAlign: "center" }}>✉ EMAIL THIS SUMMARY</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <input
                        value={summaryEmail}
                        onChange={(e) => setSummaryEmail(e.target.value)}
                        placeholder="Your email address"
                        style={{
                            flex: "1 1 200px",
                            padding: "10px 14px",
                            border: summaryEmail.trim() && !isEmailValid ? "2px solid #c0392b" : "1px solid #ddd0b5",
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
                        onClick={handleMainPageSendSummary}
                        disabled={!isEmailValid || isSubmitting}
                        style={{
                            padding: "10px 20px",
                            background: isEmailValid && !isSubmitting ? "#2c2415" : "#c9bfaf",
                            border: "none",
                            borderRadius: 6,
                            color: "#c8a96e",
                            fontFamily: "'Cinzel', serif",
                            fontSize: 11,
                            letterSpacing: "0.1em",
                            cursor: (isEmailValid && !isSubmitting) ? "pointer" : "not-allowed",
                            whiteSpace: "nowrap",
                            transition: "all 0.2s",
                            opacity: isEmailValid ? 1 : 0.5
                        }}
                    >
                        {isSubmitting ? "SENDING…" : "SEND SUMMARY"}
                    </button>
                </div>
                <div style={{ color: "#a8956a", fontSize: 12, marginTop: 8 }}>A copy will also be sent to Arietta Entertainment.</div>
            </div>

            {/* Summary Modal */}
            <SummaryModal
                showSummary={showSummary}
                onClose={() => setShowSummary(false)}
                visibleMoments={visibleMoments}
                selections={selections}
                customSongs={customSongs}
                onSelectionsChange={onSelectionsChange}
                onRemoveCustomSong={removeCustomSong}
                customerEmail={summaryEmail}
            />
        </div>
    );
}