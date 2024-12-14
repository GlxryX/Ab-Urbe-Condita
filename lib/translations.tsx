import React from 'react';

export type Language = 'latin' | 'english';

export interface Translation {
  switchLanguage: string;
  startGame: string;
  attribution: string;
  madeBy: React.ReactNode;
  streak: string;
  bestStreak: string;
  playAgain: string;
  share: string;
  copied: string;
  home: string;
}

export interface Translations {
  english: Translation;
  latin: Translation;
}

export const HeartSvg = () => (
  <svg
    viewBox="0 0 1792 1792"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    style={{ height: '1.2rem', verticalAlign: 'middle' }}
  >
    <path
      d="M896 1664q-26 0-44-18l-624-602q-10-8-27.5-26T145 952.5 77 855 23.5 734 0 596q0-220 127-344t351-124q62 0 126.5 21.5t120 58T820 276t76 68q36-36 76-68t95.5-68.5 120-58T1314 128q224 0 351 124t127 344q0 221-229 450l-623 600q-18 18-44 18z"
      fill="#e25555"
    />
  </svg>
);

export const translations: Translations = {
  english: {
    switchLanguage: "Switch to Latin",
    startGame: "Start game",
    attribution: "Descriptions written by Gregory Stringer and Kasper McIninch",
    madeBy: <>Made with <HeartSvg /> by Mihir Balsara</>,
    streak: "Streak",
    bestStreak: "Best streak", 
    playAgain: "Play again",
    share: "Share",
    copied: "Copied",
    home: "Home"
  },
  latin: {
    switchLanguage: "Anglice lude",
    startGame: "Incipe ludum",
    attribution: "Descriptiones a Gregory Stringer et Kasper McIninch scriptae",
    madeBy: <>A Mihir Balsara cum <HeartSvg /> factus</>,
    streak: "Series",
    bestStreak: "Series maxima",
    playAgain: "Iterum lude",
    share: "Partire",
    copied: "Duplica",
    home: "Domus"
  }
};