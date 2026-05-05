export default function SuccessScreen({ clientName, clientEmail, onReset }) {
    return (
        <div style={{ minHeight: "100vh", width: "100%", background: "#f5f0e8", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
            <div style={{ textAlign: "center", maxWidth: 460 }}>
                <div style={{ fontSize: "52px", marginBottom: "22px" }}>🎻</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "34px", fontWeight: 400, color: "#3d2e1e", margin: "0 0 14px" }}>Quote Sent!</h2>
                <div style={{ width: 60, height: 1, background: "linear-gradient(90deg, transparent, #b8956a, transparent)", margin: "0 auto 22px" }} />
                <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#8a7560", fontSize: "19px", lineHeight: 1.7, fontStyle: "italic", margin: "0 0 10px" }}>
                    Thank you, {clientName}. Your inquiry has been sent to{" "}
                    <strong style={{ fontStyle: "normal", color: "#3d2e1e" }}>{clientEmail}</strong>.
                </p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#b8a88a", fontSize: "16px", lineHeight: 1.6, margin: "0 0 30px" }}>
                    We'll be in touch shortly!
                </p>
                <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                    <a
                        href="/"
                        style={{
                            padding: "12px 32px",
                            background: "#b8956a",
                            color: "#f5f0e8",
                            border: "none",
                            borderRadius: "4px",
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "16px",
                            fontStyle: "italic",
                            cursor: "pointer",
                            letterSpacing: "0.03em",
                            transition: "background 0.2s",
                            textDecoration: "none",
                            display: "inline-block",
                        }}
                        onMouseEnter={(e) => e.target.style.background = "#a0845c"}
                        onMouseLeave={(e) => e.target.style.background = "#b8956a"}
                    >
                        Back to Home
                    </a>
                    <button
                        onClick={onReset}
                        style={{
                            padding: "12px 32px",
                            background: "#3d2e1e",
                            color: "#f5f0e8",
                            border: "none",
                            borderRadius: "4px",
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "16px",
                            fontStyle: "italic",
                            cursor: "pointer",
                            letterSpacing: "0.03em",
                            transition: "background 0.2s",
                        }}
                        onMouseEnter={(e) => e.target.style.background = "#2e2216"}
                        onMouseLeave={(e) => e.target.style.background = "#3d2e1e"}
                    >
                        Submit Another Quote
                    </button>
                </div>
            </div>
        </div>
    );
}