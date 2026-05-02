/**
 * SuccessScreen.js - Success message after quote submission
 *
 * Displays confirmation that quote was sent to customer email
 */

export default function SuccessScreen({ clientName, clientEmail }) {
    return (
        <div className="pricing-success-container">
            <div className="pricing-success-emoji">🎻</div>

            <h2 className="pricing-success-title">Quote Sent!</h2>

            <div className="pricing-success-divider" />

            <p className="pricing-success-message">
                Thank you, {clientName}. Your quote has been sent to{" "}
                <strong>{clientEmail}</strong>.
            </p>

            <p className="pricing-success-subtext">
                We'll be in touch shortly to confirm your booking.
            </p>
        </div>
    );
}