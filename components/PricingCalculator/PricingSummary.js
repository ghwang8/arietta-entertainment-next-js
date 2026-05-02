/**
 * PricingSummary.js - Pricing breakdown display
 *
 * Shows itemized list of all charges and totals
 */

import { fmt } from "../../data/constants";

export default function PricingSummary({ subtotal, gst, total, lineItems }) {
    if (lineItems.length === 0) {
        return (
            <div style={{ padding: "20px 0", textAlign: "center", color: "#b8a88a" }}>
                <p style={{ fontSize: "14px", fontStyle: "italic" }}>
                    Select an ensemble and location to see pricing
                </p>
            </div>
        );
    }

    return (
        <div className="pricing-summary">
            <div className="pricing-summary-border">
                {lineItems.map((item, idx) => (
                    <div key={idx} className="pricing-summary-row">
                        <span>{item.label}</span>
                        <span style={{ fontWeight: 500 }}>{fmt(item.val)}</span>
                    </div>
                ))}

                <div className="pricing-summary-total-box">
                    <div className="pricing-summary-row">
                        <span className="pricing-summary-label">Subtotal</span>
                        <span className="pricing-summary-label">{fmt(subtotal)}</span>
                    </div>

                    <div className="pricing-summary-row" style={{ marginBottom: "12px" }}>
                        <span className="pricing-summary-label">GST (5%)</span>
                        <span className="pricing-summary-label">{fmt(gst)}</span>
                    </div>

                    <div className="pricing-summary-total-row">
                        <span>Total</span>
                        <span>{fmt(total)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}