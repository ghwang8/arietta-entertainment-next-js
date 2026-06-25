import "../styles/styles.css";
import Head from 'next/head';

/**
 * _app.js - Global App Component
 *
 * This is the main application wrapper for the Next.js app.
 * It's called for every page that's rendered, making it the perfect place for:
 * - Global CSS imports
 * - Global metadata/SEO setup
 * - Shared layout components (navbar, footer, etc.)
 *
 * @param {Object} props - Component props
 * @param {React.ComponentType} props.Component - The active page component
 * @param {Object} props.pageProps - Props passed to the page component
 * @returns {JSX.Element} - The app wrapper with global Head metadata
 */
export default function App({ Component, pageProps }) {
    // Import global styles from the CSS file
    // This applies styles to the entire application

    return (
        <div>
            {/* Head component sets document head metadata (SEO, favicon, scripts) */}
            <Head>
                {/* Favicon displayed in browser tab */}
                <link rel="icon" href="/images/favicon.ico" />

                {/* Browser tab title */}
                <title>ARIETTA Entertainment</title>

                {/* Meta description for search engines and social media sharing */}
                <meta name="description" content="We are a premier music company..." />

                {/* Tell search engines to index and follow links on this site */}
                <meta name="robots" content="index, follow" />

                {/* Ensure proper rendering on mobile and desktop */}
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Afacad+Flux:wght@100..1000&family=Combo&family=Press+Start+2P&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
                {/* Load client-side script for browser viewport height variable (--vh) */}
                {/* This fixes mobile browser issues with 100vh */}
                <script src="/browser-offset.js"></script>
            </Head>

            {/* Render the current page with its props */}
            <Component {...pageProps} />
        </div>
    );
}