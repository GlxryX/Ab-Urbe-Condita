import { GameState } from "../types/game";
import { Item } from "../types/item";
import { getRandomItem } from "./items";

export default async function createState(deck: Item[]): Promise<GameState> {
  // Get initial card
  const initialCard = getRandomItem(deck, []);

  // Add it to played list as correct
  const played = [{
    ...initialCard,
    played: { correct: true }
  }];

  // Get next cards
  const next = getRandomItem(deck, played);
  const nextButOne = getRandomItem(deck, [...played, next]);

  return {
    badlyPlaced: null,
    deck,
    lives: 3,
    next,
    nextButOne,
    played, // Now includes initial card
  };
}