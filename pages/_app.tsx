import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { polyfill } from "seamless-scroll-polyfill";
import "../styles/globals.scss";

function App({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    polyfill();
  }, []);

  return (
    <>
      <Head>
        <title>Ab Urbe Condita</title>
        <meta name="description" content="A Roman history timeline game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Ab Urbe Condita" />
        <meta property="og:description" content="A Roman history timeline game" />
        <meta property="og:url" content="https://ab-urbe-condita.netlify.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/logo.png" />
        <meta name="theme-color" content="#23272c" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏛️</text></svg>"></link>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;