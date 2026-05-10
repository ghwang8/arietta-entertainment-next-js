/**
 * Wedding Song Selector Page
 * Standalone page for customers to browse and select songs for their wedding moments
 * URL: /wedding-song-selector
 */

import { useState } from "react";
import WeddingSongSelector from "../components/PricingCalculator/WeddingSongSelector";

export default function WeddingSongSelectorPage() {
    const [selections, setSelections] = useState({});

    const handleSelectionsChange = (newSelections) => {
        setSelections(newSelections);
    };

    return (
        <div style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto", minHeight: "100vh", background: "#f5f0e8" }}>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 6vw, 48px)", color: "#3d2e1e", marginBottom: "10px", fontWeight: 700 }}>
                    Wedding Song Selector
                </h1>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: "#8a7560", letterSpacing: "0.05em", marginTop: 0 }}>
                    Choose songs for each moment of your special day
                </p>
            </div>

            {/* Song Selector */}
            <div style={{ background: "#fff", borderRadius: "2px", boxShadow: "0 4px 40px rgba(61,46,30,0.08), 0 1px 4px rgba(61,46,30,0.05)", overflow: "hidden", padding: "30px" }}>
                <WeddingSongSelector
                    selections={selections}
                    onSelectionsChange={handleSelectionsChange}
                />
            </div>
        </div>
    );
}