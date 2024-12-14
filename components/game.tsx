import React, { useState } from "react";
import axios from "axios";
import Papa from 'papaparse';
import { GameState } from "../types/game";
import { Item } from "../types/item";
import createState from "../lib/create-state";
import Board from "./board";
import Loading from "./loading";
import Instructions from "./instructions";

// Interface for CSV row structure
interface CsvRow {
  'Year (English)': string;
  'Year (Latin)': string;
  'Event (Latin)': string;
  'Event (English)': string;
}

export default function Game() {
  const [state, setState] = useState<GameState | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [started, setStarted] = useState(false);
  const [items, setItems] = useState<Item[] | null>(null);
  const [language, setLanguage] = useState<'latin' | 'english'>('english');

  React.useEffect(() => {
    const fetchGameData = async () => {
      const [acnResponse, pcnResponse] = await Promise.all([
        axios.get('/acn.csv'),
        axios.get('/pcn.csv'),
      ]);

      const parseCsv = (data: string) =>
        new Promise<CsvRow[]>((resolve) => {
          Papa.parse<CsvRow>(data, {
            header: true,
            dynamicTyping: true,
            complete: (results: Papa.ParseResult<CsvRow>) => {
              resolve(results.data);
            },
          });
        });

      const [acnItems, pcnItems] = await Promise.all([
        parseCsv(acnResponse.data),
        parseCsv(pcnResponse.data),
      ]);

      const adjustedAcnItems: Item[] = acnItems.map((item, index) => ({
        id: `acn-${index}`,
        yearValue: -Number(item['Year (English)']),
        yearLabelLatin: item['Year (Latin)'],
        yearLabelEnglish: `${item['Year (English)']} aCn`,
        eventLatin: item['Event (Latin)'],
        eventEnglish: item['Event (English)']
      }));

      const adjustedPcnItems: Item[] = pcnItems.map((item, index) => ({
        id: `pcn-${index}`,
        yearValue: Number(item['Year (English)']),
        yearLabelLatin: item['Year (Latin)'],
        yearLabelEnglish: `${item['Year (English)']} pCn`,
        eventLatin: item['Event (Latin)'],
        eventEnglish: item['Event (English)']
      }));

      setItems([...adjustedAcnItems, ...adjustedPcnItems]);
    };
    fetchGameData();
  }, []);

  React.useEffect(() => {
    if (items !== null) {
      createState(items).then(newState => {
        setState(newState);
        setLoaded(true);
      });
    }
  }, [items]);

  const resetGame = React.useCallback(() => {
    if (items !== null) {
      createState(items).then(setState);
    }
  }, [items]);

  const [highscore, setHighscore] = React.useState<number>(
    Number(localStorage.getItem("highscore") ?? "0")
  );

  const updateHighscore = React.useCallback((score: number) => {
    localStorage.setItem("highscore", String(score));
    setHighscore(score);
  }, []);

  if (!loaded || state === null) {
    return <Loading />;
  }

  if (!started) {
    return (
      <Instructions
        highscore={highscore}
        start={() => setStarted(true)}
        language={language}
        setLanguage={setLanguage}
      />
    );
  }

  return (
    <Board
      highscore={highscore}
      resetGame={resetGame}
      state={state}
      setState={setState}
      updateHighscore={updateHighscore}
      language={language}
      setLanguage={setLanguage}
    />
  );
}