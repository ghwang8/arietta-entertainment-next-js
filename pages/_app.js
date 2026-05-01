import "../styles/styles.css";
import Head from 'next/head';

export default function App({ Component, pageProps }) {
    return (
    <div>
       <Head>
        <link rel="icon" href="/images/favicon.ico" />
        <title>ARIETTA Entertainment</title>
        <meta name="description" content="We are a premier music company that provide entertainment programs and live performances for any occasion, event, venue, or establishment. From classical, to rock, to pop our setlist consists of a dynamic selection of musical repertoire." />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="/browser-offset.js"></script>
      </Head>
      <Component {...pageProps} />
    </div>
    
    );
  }