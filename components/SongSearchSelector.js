/**
 * Song Search Selector Component
 * Simplified song selector for custom song add-ons
 * Allows customers to search/filter songs or add custom entries
 */

import { useState } from "react";
import { useSongData } from "./PricingCalculator/WeddingSongSelector/useSongData";
import { useSongFiltering } from "./PricingCalculator/WeddingSongSelector/useSongFiltering";

export default function SongSearchSelector({ customSongs = [], onCustomSongsChange = () => {} }) {
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("alpha");
    const [filterGenre, setFilterGenre] = useState("All");
    const [selectedSong, setSelectedSong] = useState(null);

    const allSongs = useSongData();
    const filtered = useSongFiltering(allSongs, search, sortBy, filterGenre);

    const addCustomSong = () => {
        const newSong = {
            name: "",
            artist: "",
            id: `song-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        };
        onCustomSongsChange([...customSongs, newSong]);
    };

    const removeCustomSong = (index) => {
        onCustomSongsChange(customSongs.filter((_, i) => i !== index));
    };

    const updateCustomSong = (index, field, value) => {
        const updated = [...customSongs];
        updated[index] = { ...updated[index], [field]: value };
        onCustomSongsChange(updated);
    };

    const genres = ["All", "Classical", "Film & Musical", "Disney", "Pop & Contemporary"];

    return (
        <div style={{ background: "#fdf9f2", border: "1px solid #e0d5c0", borderRadius: 10, padding: "16px" }}>
            {/* Modal Backdrop */}
            {selectedSong && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000
                }}
                     onClick={() => setSelectedSong(null)}
                >
                    {/* Modal */}
                    <div style={{
                        background: "#fff",
                        borderRadius: "8px",
                        padding: "32px",
                        maxWidth: "400px",
                        width: "90%",
                        boxShadow: "0 10px 40px rgba(61,46,30,0.2)",
                        position: "relative",
                        zIndex: 1001,
                    }}
                         onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedSong(null)}
                            style={{
                                position: "absolute",
                                top: "16px",
                                right: "16px",
                                background: "none",
                                border: "none",
                                fontSize: "28px",
                                color: "#c0392b",
                                cursor: "pointer",
                                padding: "0",
                                width: "32px",
                                height: "32px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                lineHeight: 1
                            }}
                        >
                            ×
                        </button>

                        {/* Modal Content */}
                        <div style={{ paddingRight: "24px" }}>
                            <div style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: "12px",
                                letterSpacing: "0.1em",
                                color: "#b8956a",
                                textTransform: "uppercase",
                                marginBottom: "6px"
                            }}>
                                Title
                            </div>
                            <h2 style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: "24px",
                                color: "#3d2e1e",
                                marginTop: 0,
                                marginBottom: "16px",
                                lineHeight: 1.3,
                                wordBreak: "break-word"
                            }}>
                                {selectedSong.title}
                            </h2>

                            <div style={{ marginBottom: "16px" }}>
                                <div style={{
                                    fontFamily: "'Cormorant Garamond', serif",
                                    fontSize: "12px",
                                    letterSpacing: "0.1em",
                                    color: "#b8956a",
                                    textTransform: "uppercase",
                                    marginBottom: "6px"
                                }}>
                                    Artist
                                </div>
                                <div style={{
                                    fontFamily: "'Cormorant Garamond', serif",
                                    fontSize: "16px",
                                    color: "#3d2e1e",
                                    wordBreak: "break-word"
                                }}>
                                    {selectedSong.artist}
                                </div>
                            </div>

                            <div>
                                <div style={{
                                    fontFamily: "'Cormorant Garamond', serif",
                                    fontSize: "12px",
                                    letterSpacing: "0.1em",
                                    color: "#b8956a",
                                    textTransform: "uppercase",
                                    marginBottom: "6px"
                                }}>
                                    Genre
                                </div>
                                <div style={{
                                    display: "inline-block",
                                    padding: "4px 12px",
                                    borderRadius: 20,
                                    background: "#8a7a5a",
                                    color: "#fff",
                                    fontSize: "12px",
                                    fontFamily: "'Cinzel', serif",
                                    letterSpacing: "0.05em"
                                }}>
                                    {selectedSong.genre}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {/* Custom Songs Section - MOVED TO TOP */}
            <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: customSongs.length > 0 ? 16 : 12 }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", letterSpacing: "0.08em", color: "#8a7560", textTransform: "uppercase" }}>
                        Custom Songs
                        <span style={{ fontSize: "12px", color: "#a8956a", fontWeight: "normal", display: "block", marginTop: "4px", textTransform: "none", letterSpacing: "normal" }}>
                            Don't see the song in our list? Click the + button
                        </span>
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", color: "#3d2e1e", minWidth: "20px", textAlign: "center" }}>{customSongs.length}</span>
                        <button onClick={addCustomSong} style={{ width: 28, height: 28, borderRadius: "50%", border: "1.5px solid #ddd0bb", background: "#3d2e1e", color: "#f5f0e8", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>+</button>
                    </div>
                </div>

                {customSongs.map((song, idx) => (
                    <div key={song.id} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "center" }}>
                        <span style={{ fontSize: 18, color: "#c8a96e", flexShrink: 0 }}>•</span>
                        <div style={{ flex: 1, display: "flex", gap: 12, alignItems: "center", minWidth: 0 }}>
                            <input
                                type="text"
                                value={song.name}
                                onChange={(e) => {
                                    updateCustomSong(idx, "name", e.target.value);
                                }}
                                placeholder="Song name"
                                style={{ flex: 1, padding: "10px 12px", border: "1px solid #ddd0b5", borderRadius: 6, fontSize: 14, fontFamily: "'Cormorant Garamond', serif", outline: "none", color: "#2c2415", background: song.name ? "#fffdf9" : "#fff", minWidth: "80px" }}
                            />
                            <input
                                type="text"
                                value={song.artist}
                                onChange={(e) => {
                                    updateCustomSong(idx, "artist", e.target.value);
                                }}
                                placeholder="Artist"
                                style={{ flex: 1, padding: "10px 12px", border: "1px solid #ddd0b5", borderRadius: 6, fontSize: 14, fontFamily: "'Cormorant Garamond', serif", outline: "none", color: "#2c2415", background: song.artist ? "#fffdf9" : "#fff", minWidth: "80px" }}
                            />
                            <button
                                onClick={() => removeCustomSong(idx)}
                                style={{ background: "none", border: "none", color: "#c0392b", cursor: "pointer", fontSize: 18, padding: "0 8px", lineHeight: 1, flexShrink: 0 }}
                            >
                                ×
                            </button>
                        </div>
                    </div>
                ))}

            </div>

            {/* Search Song Library Section */}
            <div style={{ borderTop: "1px solid #e0d5c0", paddingTop: 16 }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", letterSpacing: "0.08em", color: "#8a7560", textTransform: "uppercase", display: "block", marginBottom: 12 }}>
                    Check if your song is in our library
                    <span style={{ fontSize: "12px", color: "#a8956a", fontWeight: "normal", display: "block", marginTop: "4px", textTransform: "none", letterSpacing: "normal" }}>
                        (Need help knowing if we don't have your song? Search here to check)
                    </span>
                </span>

                {/* Controls */}
                <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search songs or artists…"
                        style={{ flex: "1 1 200px", padding: "10px 16px", border: "1px solid #ddd0b5", borderRadius: 8, fontSize: 14, background: "#fff", fontFamily: "'Cormorant Garamond', serif", outline: "none", color: "#2c2415", minWidth: "120px" }}
                    />
                    <div style={{ display: "flex", gap: 4, background: "#f0ebe0", borderRadius: 8, padding: 4, flexWrap: "wrap" }}>
                        {[["alpha","A–Z Title"],["singer","By Artist"],["genre","By Genre"]].map(([val, label]) => (
                            <button key={val} onClick={() => setSortBy(val)} style={{ padding: "6px 12px", borderRadius: 6, fontSize: 12, fontFamily: "'Cinzel', serif", letterSpacing: "0.05em", background: sortBy === val ? "#c8a96e" : "transparent", color: sortBy === val ? "#fff" : "#7a6030", border: "none", cursor: "pointer" }}>
                                {label}
                            </button>
                        ))}
                    </div>
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                        {genres.map(g => (
                            <button key={g} onClick={() => setFilterGenre(g)} style={{ padding: "6px 12px", borderRadius: 20, fontSize: 11, fontFamily: "'Cinzel', serif", letterSpacing: "0.04em", border: "1px solid", borderColor: filterGenre === g ? "#c8a96e" : "#ddd0b5", background: filterGenre === g ? "#c8a96e" : "transparent", color: filterGenre === g ? "#fff" : "#7a6030", cursor: "pointer" }}>
                                {g}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Song count */}
                <div style={{ fontSize: 12, color: "#a8956a", marginBottom: 12, fontFamily: "'Cinzel', serif", letterSpacing: "0.08em" }}>
                    {filtered.length} SONG{filtered.length !== 1 ? "S" : ""}
                </div>

                {/* Empty state when no results */}
                {search.trim() && filtered.length === 0 && (
                    <div style={{ padding: "20px", background: "#fdf6e8", border: "1px solid #e8d9b5", borderRadius: 8, textAlign: "center", fontSize: 14, color: "#7a6030" }}>
                        <p style={{ margin: 0, marginBottom: 10 }}>Sorry, we don't have this song available.</p>
                        <p style={{ margin: 0, fontStyle: "italic", color: "#a8956a" }}>You can add it to your custom songs list above.</p>
                    </div>
                )}

                {/* Song List */}
                {filtered.length > 0 && (
                    <>
                        {/* Fixed Header */}
                        <div style={{ display: "flex", padding: "10px 16px", background: "#f5efe3", borderBottom: "1px solid #e8dfc8", fontSize: 10, letterSpacing: "0.2em", color: "#a8956a", fontFamily: "'Cinzel', serif", gap: "12px", borderRadius: "8px 8px 0 0" }}>
                            <div style={{ flex: 1, minWidth: 0 }}>TITLE</div>
                            <div style={{ flex: 0.8, minWidth: 0 }}>ARTIST</div>
                            <div style={{ flex: 0.6, minWidth: 0 }}>GENRE</div>
                        </div>

                        {/* Song List */}
                        <div style={{ maxHeight: "300px", overflowY: "auto", border: "1px solid #e8dfc8", borderRadius: "0 0 8px 8px", background: "#fff" }}>
                            {filtered.map(song => (
                                <div
                                    key={song.id}
                                    onClick={() => setSelectedSong(song)}
                                    style={{
                                        display: "flex",
                                        padding: "11px 16px",
                                        borderBottom: "1px solid #ece6d8",
                                        gap: "12px",
                                        alignItems: "center",
                                        cursor: "pointer",
                                        transition: "all 0.2s ease"
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.background = "#faf6f0"}
                                    onMouseLeave={e => e.currentTarget.style.background = "white"}
                                >
                                    <div style={{ flex: 1, fontWeight: 500, fontSize: 14, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{song.title}</div>
                                    <div style={{ flex: 0.8, fontSize: 13, color: "#6a5530", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{song.artist}</div>
                                    <div style={{ flex: 0.6, fontSize: 11, padding: "2px 8px", borderRadius: 20, background: "#8a7a5a", color: "#fff", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{song.genre}</div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}