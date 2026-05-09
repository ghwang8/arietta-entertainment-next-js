/**
 * Summary Modal Component
 * Displays selected songs and allows editing
 */

export default function SummaryModal({ showSummary, onClose, visibleMoments, selections, onSelectionsChange }) {
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
            <div className="summary-card fade-in" onClick={e => e.stopPropagation()} style={{ background: "#faf7f2", borderRadius: 12, maxWidth: 680, width: "100%", maxHeight: "85vh", overflowY: "auto", padding: "40px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
                <div style={{ textAlign: "center", marginBottom: 32 }}>
                    <div style={{ fontSize: 10, letterSpacing: "0.35em", color: "#c8a96e", fontFamily: "'Cinzel', serif", marginBottom: 8 }}>YOUR SELECTIONS</div>
                    <h2 style={{ margin: 0, fontWeight: 300, fontStyle: "italic", fontSize: 32, color: "#2c2415" }}>Music Programme</h2>
                    <div style={{ width: 60, height: 1, background: "#c8a96e", margin: "16px auto 0" }}></div>
                </div>

                {visibleMoments.map(m => {
                    const list = selections[m.key] || [];
                    return (
                        <div key={m.key} style={{ marginBottom: 24 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                <span style={{ color: "#c8a96e", fontSize: 16 }}>{m.icon}</span>
                                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: "0.15em", color: "#6a5530" }}>{m.label.toUpperCase()}</div>
                            </div>
                            {list.length === 0 ? (
                                <div style={{ fontSize: 13, color: "#c0b090", fontStyle: "italic", paddingLeft: 24 }}>No songs selected</div>
                            ) : (
                                list.map(s => (
                                    <div key={s.id} style={{ paddingLeft: 24, paddingBottom: 10, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fdf6e8", padding: "10px 12px", marginBottom: 6, borderRadius: 6 }}>
                                        <div>
                                            <span style={{ fontWeight: 500 }}>{s.title}</span>
                                            <span style={{ color: "#a8956a", marginLeft: 8 }}>— {s.artist}</span>
                                        </div>
                                        <button
                                            onClick={() => removeSong(m.key, s.id)}
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

                <div style={{ textAlign: "center", marginTop: 20 }}>
                    <button onClick={onClose} style={{ padding: "10px 32px", background: "#c8a96e", border: "none", borderRadius: 6, color: "#fff", fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: "0.1em", cursor: "pointer" }}>
                        DONE
                    </button>
                </div>
            </div>
        </div>
    );
}