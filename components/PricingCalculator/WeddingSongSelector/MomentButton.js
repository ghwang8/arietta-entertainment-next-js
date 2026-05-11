/**
 * Moment Button Component
 * Reusable button for selecting ceremony moments
 */

export default function MomentButton({ moment, active, count, onClick }) {
    return (
        <button className="moment-btn" onClick={onClick}
                style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "11px 18px", borderRadius: 8, background: active ? "#2c2415" : "#fff", border: `1px solid ${active ? "#2c2415" : "#ddd0b5"}`, color: active ? "#c8a96e" : "#4a3820", textAlign: "left", transition: "all 0.2s ease", cursor: "pointer" }}>
            <span style={{ fontSize: 18, color: "#c8a96e", minWidth: 20 }}>{moment.icon}</span>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: "0.1em", flex: 1 }}>{moment.label.toUpperCase()}</span>
            {count > 0 && <span style={{ background: "#c8a96e", color: "#fff", borderRadius: 20, padding: "1px 9px", fontSize: 11, fontFamily: "'Cinzel', serif" }}>{count}</span>}
        </button>
    );
}