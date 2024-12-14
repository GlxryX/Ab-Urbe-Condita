export interface Item {
  id: string;
  yearValue: number;           // Numeric year used for comparisons
  yearLabelLatin: string;
  yearLabelEnglish: string;
  eventLatin: string;
  eventEnglish: string;
}

export type PlayedItem = Item & {
  played: {
    correct: boolean;
  };
};