/**
 * Summary Modal Component
 * Displays selected songs and allows editing
 */

export default function SummaryModal({ showSummary, onClose, visibleMoments, selections, customSongs, onSelectionsChange, onRemoveCustomSong }) {
    if (!showSummary) return null;

    const removeSong = (momentKey, songId) => {
        const updated = selections[momentKey].filter(s => s.id !== songId);
        onSelectionsChange({
            ...selections,
            [momentKey]: updated
        });
    };

    return (
        <div className="summary-overlay" onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(44,36,21,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
            <div className="summary-card fade-in" onClick={e => e.stopPropagation()} style={{ background: "#faf7f2", borderRadius: 12, maxWidth: 680, width: "100%", maxHeight: "85vh", display: "flex", flexDirection: "column", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>

                {/* Fixed Header with X Button */}
                <div style={{ position: "sticky", top: 0, background: "#faf7f2", borderBottom: "1px solid #e8dfc8", padding: "40px 40px 0", zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ textAlign: "center", flex: 1 }}>
                        <div style={{ fontSize: 10, letterSpacing: "0.35em", color: "#c8a96e", fontFamily: "'Cinzel', serif", marginBottom: 8 }}>YOUR SELECTIONS</div>
                        <h2 style={{ margin: 0, fontWeight: 300, fontStyle: "italic", fontSize: 32, color: "#2c2415" }}>Music Programme</h2>
                        <div style={{ width: 60, height: 1, background: "#c8a96e", margin: "16px auto 0" }}></div>
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
                    {visibleMoments.map(m => {
                        const list = selections[m.key] || [];
                        const customList = customSongs[m.key] || [];
                        const allSongs = [...list, ...customList.map((s, idx) => ({ ...s, isCustom: true, customIdx: idx }))];

                        return (
                            <div key={m.key} style={{ marginBottom: 24 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                    <span style={{ color: "#c8a96e", fontSize: 16 }}>{m.icon}</span>
                                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: "0.15em", color: "#6a5530" }}>
                                        {m.label.toUpperCase()}
                                        {m.key === "signing_song" && <span style={{ color: "#b8a080", fontStyle: "italic", fontSize: 10, marginLeft: 4 }}>(optional)</span>}
                                    </div>
                                </div>
                                {allSongs.length === 0 ? (
                                    <div style={{ fontSize: 13, color: "#c0b090", fontStyle: "italic", paddingLeft: 24 }}>No songs selected</div>
                                ) : (
                                    allSongs.map((s, idx) => (
                                        <div key={s.id || idx} style={{ paddingLeft: 24, paddingBottom: 10, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fdf6e8", padding: "10px 12px", marginBottom: 6, borderRadius: 6 }}>
                                            <div>
                                                <span style={{ fontWeight: 500 }}>{s.name || s.title}</span>
                                                <span style={{ color: "#a8956a", marginLeft: 8 }}>— {s.artist}</span>
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
                                    ))
                                )}
                                {m.key !== "after_ceremony" && <div style={{ height: 1, background: "#ece6d8", marginTop: 16 }}></div>}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}