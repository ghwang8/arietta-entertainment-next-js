/**
 * Song List Component
 * Displays all songs in a filterable table
 */

import { genreColor, MOMENTS } from "./constants";

export default function SongList({ songs, filtered, activeMoment, isSelected, momentOf, toggleSong, selections }) {
    const getAllMomentsForSong = (song) => {
        const moments = [];
        MOMENTS.forEach(m => {
            if ((selections[m.key] || []).some(s => s.id === song.id)) {
                moments.push(m);
            }
        });
        return moments;
    };

    return (
        <div style={{ background: "#fff", border: "1px solid #e8dfc8", borderRadius: 10, overflow: "hidden", marginBottom: 40 }}>
            {/* Header */}
            <div style={{ display: "flex", padding: "10px 20px", background: "#f5efe3", borderBottom: "1px solid #e8dfc8", fontSize: 10, letterSpacing: "0.2em", color: "#a8956a", fontFamily: "'Cinzel', serif", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ flex: 1 }}>TITLE</div>
                <div style={{ flex: 0.8, textAlign: "left" }}>ARTIST</div>
                <div style={{ flex: 0.6, textAlign: "left" }}>GENRE</div>
                <div style={{ flex: 0.6, textAlign: "right" }}>ASSIGNED TO</div>
            </div>

            {/* Songs */}
            {filtered.map(song => {
                const sel = isSelected(song);
                const assignedMoments = getAllMomentsForSong(song);

                return (
                    <div key={song.id} className="song-row" onClick={() => toggleSong(song)}
                         style={{ display: "flex", padding: "11px 20px", background: sel ? "#fdf6e8" : "white", borderLeft: sel ? "3px solid #c8a96e" : "3px solid transparent", borderBottom: "1px solid #ece6d8", cursor: activeMoment ? "pointer" : "default", transition: "all 0.2s ease", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ fontWeight: 500, fontSize: 14, flex: 1 }}>{song.title}</div>
                        <div style={{ fontSize: 13, color: "#6a5530", flex: 0.8, textAlign: "left" }}>{song.artist}</div>
                        <div style={{ flex: 0.6, textAlign: "left" }}>
                            <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 20, fontSize: 11, letterSpacing: "0.05em", background: genreColor(song.genre), color: "#fff" }}>{song.genre}</span>
                        </div>
                        <div style={{ flex: 0.6, textAlign: "right", display: "flex", gap: "3px", justifyContent: "flex-end", alignItems: "center" }}>
                            {assignedMoments.map((moment) => (
                                <span key={moment.key} style={{ fontSize: 16, color: "#c8a96e", lineHeight: 1 }} title={moment.label}>
                                    {moment.icon}
                                </span>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}