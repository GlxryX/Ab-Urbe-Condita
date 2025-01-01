import React from "react";
import styles from "../styles/instructions.module.scss";
import Button from "./button";
import Score from "./score";
import { translations } from '../lib/translations';

interface Props {
  highscore: number;
  start: () => void;
  language: 0 | 1;
  setLanguage: React.Dispatch<React.SetStateAction<0 | 1>>;
}

export default function Instructions(props: Props) {
  const { highscore, start, language, setLanguage } = props;
  const t = translations[language];

  return (
    <div className={styles.instructions}>
      <div className={styles.wrapper}>
        <h2>Ab Urbe Condita</h2>
        {highscore !== 0 && (
          <div className={styles.highscoreWrapper}>
            <Score score={highscore} title={t.bestStreak} />
          </div>
        )}

        <div className={styles.buttons}>
          <Button
            onClick={() => setLanguage(language === 1 ? 0 : 1)}
            text={t.switchLanguage}
          />
          <Button onClick={start} text={t.startGame} />
        </div>

        <div className={styles.about}>
          <div>{t.attribution}</div>
          <div>&copy; 2025 - {t.madeBy}</div>
        </div>
      </div>
    </div>
  );
}