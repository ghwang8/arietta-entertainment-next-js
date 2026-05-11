/**
 * Wedding Song Selector Success Page
 * Shown after successful email submission
 */

import { useRouter } from "next/router";

export default function WeddingSongSelectorSuccess() {
    const router = useRouter();

    return (
        <div style={{
            minHeight: "100vh",
            width: "100%",
            background: "#f5f0e8",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 20px",
            boxSizing: "border-box",
            overflow: "hidden"
        }}>
            <div style={{ textAlign: "center", maxWidth: 460 }}>
                <div style={{ fontSize: "52px", marginBottom: "22px" }}>🎵</div>
                <h2 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "34px",
                    fontWeight: 400,
                    color: "#3d2e1e",
                    margin: "0 0 14px"
                }}>
                    Summary Sent!
                </h2>
                <div style={{
                    width: 60,
                    height: 1,
                    background: "linear-gradient(90deg, transparent, #b8956a, transparent)",
                    margin: "0 auto 22px"
                }} />
                <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "#8a7560",
                    fontSize: "19px",
                    lineHeight: 1.7,
                    fontStyle: "italic",
                    margin: "0 0 10px"
                }}>
                    Your wedding song selections have been sent successfully.
                </p>
                <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "#b8a88a",
                    fontSize: "16px",
                    lineHeight: 1.6,
                    margin: "0 0 30px"
                }}>
                    We'll be in touch shortly!
                </p>
                <button
                    onClick={() => router.push("/")}
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
                    }}
                    onMouseEnter={(e) => e.target.style.background = "#a0845c"}
                    onMouseLeave={(e) => e.target.style.background = "#b8956a"}
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
}