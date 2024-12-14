import React from "react";
import { animated, useSpring } from "react-spring";
import styles from "../styles/game-over.module.scss";
import Button from "./button";
import Score from "./score";
import { translations } from '../lib/translations';

interface Props {
  highscore: number;
  resetGame: () => void;
  score: number;
  language: 'latin' | 'english';
}

function getMedal(score: number): string {
  if (score >= 20) return "🥇 ";
  if (score >= 10) return "🥈 ";
  if (score >= 1) return "🥉 ";
  return "";
}

export default function GameOver(props: Props) {
  const { highscore, resetGame, score, language } = props;
  const t = translations[language];
  const [shareText, setShareText] = React.useState(t.share);
  const [isCopied, setIsCopied] = React.useState(false);

  React.useEffect(() => {
    if (isCopied) {
      setShareText(t.copied);
    } else {
      setShareText(t.share);
    }
  }, [language, t, isCopied]);

  const animProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  const handleShare = React.useCallback(async () => {
    await navigator.clipboard.writeText(
      `🏛️ ab-urbe-condita.netlify.app\n\n${getMedal(score)}${t.streak}: ${score}\n${getMedal(highscore)}${t.bestStreak}: ${highscore}`
    );
    setShareText(t.copied);
    setIsCopied(true);
    setTimeout(() => {
      setShareText(t.share);
      setIsCopied(false);
    }, 2000);
  }, [highscore, score, t]);

  const handleReset = React.useCallback(() => {
    resetGame();
  }, [resetGame]);

  return (
    <animated.div style={animProps} className={styles.gameOver}>
      <div className={styles.scoresWrapper}>
        <div className={styles.score}>
          <Score score={score} title={t.streak} />
        </div>
        <div className={styles.score}>
          <Score score={highscore} title={t.bestStreak} />
        </div>
      </div>
      <div className={styles.buttons}>
        <Button onClick={handleReset} text={t.playAgain} />
        <Button onClick={handleShare} text={shareText} minimal />
      </div>
    </animated.div>
  );
}