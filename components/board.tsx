import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { GameState } from "../types/game";
import useAutoMoveSensor from "../lib/useAutoMoveSensor";
import { checkCorrect, getRandomItem } from "../lib/items";
import { translations } from '../lib/translations';
import NextItemList from "./next-item-list";
import PlayedItemList from "./played-item-list";
import styles from "../styles/board.module.scss";
import Hearts from "./hearts";
import GameOver from "./game-over";
import Button from "./button";

interface Props {
  highscore: number;
  resetGame: () => void;
  state: GameState;
  setState: (state: GameState) => void;
  updateHighscore: (score: number) => void;
  language: 'latin' | 'english';
  setLanguage: React.Dispatch<React.SetStateAction<'latin' | 'english'>>;
}

export default function Board(props: Props) {
  const { language, setLanguage, highscore, resetGame, state, setState, updateHighscore } = props;
  const t = translations[language];
  const [isDragging, setIsDragging] = React.useState(false);

  async function onDragStart() {
    setIsDragging(true);
    try {
      // Check if vibration API is supported
      if (navigator.vibrate) {
        navigator.vibrate(20);
      }
    } catch (error) {
      // Silently fail if vibration not supported
      console.debug('Vibration not supported');
    }
  }

  async function onDragEnd(result: DropResult) {
    setIsDragging(false);

    const { source, destination } = result;

    if (
      !destination ||
      state.next === null ||
      (source.droppableId === "next" && destination.droppableId === "next")
    ) {
      return;
    }

    const item = { ...state.next };

    if (source.droppableId === "next" && destination.droppableId === "played") {
      const newDeck = [...state.deck];
      const newPlayed = [...state.played];
      const { correct, delta } = checkCorrect(
        newPlayed,
        item,
        destination.index
      );
      newPlayed.splice(destination.index, 0, {
        ...state.next,
        played: { correct },
      });

      const newNext = state.nextButOne;
      const newNextButOne = getRandomItem(
        newDeck,
        newNext ? [...newPlayed, newNext] : newPlayed
      );

      setState({
        ...state,
        deck: newDeck,
        next: newNext,
        nextButOne: newNextButOne,
        played: newPlayed,
        lives: correct ? state.lives : state.lives - 1,
        badlyPlaced: correct
          ? null
          : {
              index: destination.index,
              rendered: false,
              delta,
            },
      });
    } else if (
      source.droppableId === "played" &&
      destination.droppableId === "played"
    ) {
      const newPlayed = [...state.played];
      const [item] = newPlayed.splice(source.index, 1);
      newPlayed.splice(destination.index, 0, item);

      setState({
        ...state,
        played: newPlayed,
        badlyPlaced: null,
      });
    }
  }

  // Ensure that newly placed items are rendered as draggables before trying to
  // move them to the right place if needed.
  React.useLayoutEffect(() => {
    if (
      state.badlyPlaced &&
      state.badlyPlaced.index !== null &&
      !state.badlyPlaced.rendered
    ) {
      setState({
        ...state,
        badlyPlaced: { ...state.badlyPlaced, rendered: true },
      });
    }
  }, [setState, state]);

  const score = React.useMemo(() => {
    return state.played.filter((item) => item.played.correct).length - 1;
  }, [state.played]);

  React.useLayoutEffect(() => {
    if (score > highscore) {
      updateHighscore(score);
    }
  }, [score, highscore, updateHighscore]);

   return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      sensors={[useAutoMoveSensor.bind(null, state)]}
    >
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <div className={styles.homeButtonContainer}>
            <Button
              onClick={() => window.location.href = '/'}
              text={t.home}
            />
          </div>
          <div className={styles.buttonContainer}>
            <Button
              onClick={() => setLanguage(language === 'english' ? 'latin' : 'english')}
              text={t.switchLanguage}
            />
          </div>
          <Hearts lives={state.lives} />
          {state.lives > 0 ? (
            <>
              <NextItemList next={state.next} language={language} />
            </>
          ) : (
            <GameOver
              highscore={highscore}
              resetGame={resetGame}
              score={score}
              language={language}
            />
          )}
        </div>
        <div id="bottom" className={styles.bottom}>
          <PlayedItemList
            badlyPlacedIndex={state.badlyPlaced ? state.badlyPlaced.index : null}
            isDragging={isDragging}
            items={state.played}
            language={language}
          />
        </div>
      </div>
    </DragDropContext>
  );
}