import { Item, PlayedItem } from "../types/item";

export function getRandomItem(deck: Item[], played: Item[]): Item {
  const periods: [number, number][] = [
    [-1000, -1],   // BCE dates
    [0, 500],      // Early CE dates
    [501, 2020],   // Later dates
  ];
  const [fromYear, toYear] =
    periods[Math.floor(Math.random() * periods.length)];

  const candidates = deck.filter((candidate) => {
    if (candidate.yearValue < fromYear || candidate.yearValue > toYear) {
      return false;
    }
    if (tooClose(candidate, played)) {
      return false;
    }
    return true;
  });

  if (candidates.length > 0) {
    return candidates[Math.floor(Math.random() * candidates.length)];
  }
  return deck[Math.floor(Math.random() * deck.length)];
}

function tooClose(item: Item, played: Item[]) {
  let distance = played.length < 40 ? 5 : 1;
  if (played.length < 11) {
    distance = 110 - 10 * played.length;
  }

  return played.some((p) => Math.abs(item.yearValue - p.yearValue) < distance);
}

export function checkCorrect(
  played: PlayedItem[],
  item: Item,
  index: number
): { correct: boolean; delta: number } {
  const sorted = [...played, item].sort((a, b) => a.yearValue - b.yearValue);
  const correctIndex = sorted.findIndex((i) => i.id === item.id);

  if (index !== correctIndex) {
    return { correct: false, delta: correctIndex - index };
  }

  return { correct: true, delta: 0 };
}