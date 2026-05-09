/**
 * Wedding Song Selector Component
 * Allows clients to select songs for different moments of their wedding
 */

import { useState, useMemo } from "react";
import { MOMENTS, CEREMONY_MOMENTS } from "./constants";
import { useSongData } from "./useSongData";
import { useSongFiltering } from "./useSongFiltering";
import MomentButton from "./MomentButton";
import SongList from "./SongList";
import SummaryModal from "./SummaryModal";

export default function WeddingSongSelector({ selections = {}, onSelectionsChange = () => {} }) {
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("alpha");
    const [filterGenre, setFilterGenre] = useState("All");
    const [activeMoment, setActiveMoment] = useState(null);
    const [showSummary, setShowSummary] = useState(false);
    const [includeSigningSong, setIncludeSigningSong] = useState(false);

    const allSongs = useSongData();
    const filtered = useSongFiltering(allSongs, search, sortBy, filterGenre);

    const visibleMoments = useMemo(() =>
            MOMENTS.filter(m => m.key !== "signing_song" || includeSigningSong),
        [includeSigningSong]
    );

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

    const totalSelected = visibleMoments.reduce((acc, m) => acc + (selections[m.key] || []).length, 0);

    const genres = ["All", "Classical", "Film & Musical", "Disney", "Pop & Contemporary"];

    return (
        <div style={{ minHeight: "auto", background: "transparent" }}>
            {/* Step 4: Song Selection with View and Edit Summary Button */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #b8956a, #d4af7a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#fff", flexShrink: 0, fontFamily: "'Playfair Display', serif" }}>4</div>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", letterSpacing: "0.08em", color: "#8a7560", textTransform: "uppercase" }}>Wedding Song Selection (Optional)</span>
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
                    <MomentButton moment={MOMENTS[0]} active={activeMoment === MOMENTS[0].key} count={(selections[MOMENTS[0].key] || []).length} onClick={() => setActiveMoment(activeMoment === MOMENTS[0].key ? null : MOMENTS[0].key)} />
                </div>

                {/* Ceremony group */}
                <div style={{ border: "1px solid #e0d5c0", borderRadius: 10, padding: "14px 16px", marginBottom: 10, background: "#fff" }}>
                    <div style={{ fontSize: 9, letterSpacing: "0.3em", color: "#b8956a", marginBottom: 12, fontFamily: "'Cinzel', serif", textAlign: "center" }}>CEREMONY</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 8 }}>
                        {visibleMoments.filter(m => CEREMONY_MOMENTS.includes(m.key)).map(m => (
                            <MomentButton key={m.key} moment={m} active={activeMoment === m.key} count={(selections[m.key] || []).length} onClick={() => setActiveMoment(activeMoment === m.key ? null : m.key)} />
                        ))}
                    </div>
                    <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid #ece6d8", display: "flex", alignItems: "center", gap: 10 }}>
                        <div onClick={() => { setIncludeSigningSong(v => !v); if (includeSigningSong && activeMoment === "signing_song") setActiveMoment(null); }}
                             style={{ width: 36, height: 20, borderRadius: 10, background: includeSigningSong ? "#c8a96e" : "#ddd0b5", position: "relative", transition: "background 0.2s", cursor: "pointer", flexShrink: 0 }}>
                            <div style={{ position: "absolute", top: 3, left: includeSigningSong ? 18 : 3, width: 14, height: 14, borderRadius: "50%", background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
                        </div>
                        <span style={{ fontSize: 12, color: "#7a6030", fontFamily: "'Cinzel', serif", letterSpacing: "0.06em", cursor: "pointer", userSelect: "none" }}
                              onClick={() => { setIncludeSigningSong(v => !v); if (includeSigningSong && activeMoment === "signing_song") setActiveMoment(null); }}>
                            ✒ Include a Signing Song <span style={{ color: "#b8a080", fontStyle: "italic", fontSize: 11, fontFamily: "'Cormorant Garamond', serif" }}>(optional)</span>
                        </span>
                    </div>
                </div>

                {/* After Ceremony */}
                <MomentButton moment={MOMENTS[5]} active={activeMoment === MOMENTS[5].key} count={(selections[MOMENTS[5].key] || []).length} onClick={() => setActiveMoment(activeMoment === MOMENTS[5].key ? null : MOMENTS[5].key)} />
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

            {/* Song List - Scrollable Container */}
            <div style={{ maxHeight: "300px", overflowY: "auto", marginBottom: 40 }}>
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

            {/* Summary Modal */}
            <SummaryModal
                showSummary={showSummary}
                onClose={() => setShowSummary(false)}
                visibleMoments={visibleMoments}
                selections={selections}
                onSelectionsChange={onSelectionsChange}
            />
        </div>
    );
}