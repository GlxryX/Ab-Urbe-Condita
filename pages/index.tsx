import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const Game = dynamic(() => import("../components/game"), { ssr: false });

export default function Index() {
  return (
    <>
      <Head>
        <title>Ab Urbe Condita</title>
        <meta name="description" content="Play Ab Urbe Condita, a Roman history timeline game." />
        <meta property="og:title" content="Ab Urbe Condita - Home" />
        <meta property="og:description" content="Play Ab Urbe Condita, a Roman history timeline game." />
        <meta property="og:url" content="https://ab-urbe-condita.netlify.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/logo.png" />
      </Head>

      <Game />
    </>
  );
}