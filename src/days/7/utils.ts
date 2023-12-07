import { split } from '../../utils/split';

const cardsStrength = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'T',
  'J',
  'Q',
  'K',
  'A',
] as const;

export type Cards = (typeof cardsStrength)[number];

export const compareCards = (a: Cards, b: Cards): number => {
  const aIndex = cardsStrength.indexOf(a);
  const bIndex = cardsStrength.indexOf(b);
  if (aIndex === bIndex) {
    return 0;
  }
  return aIndex > bIndex ? 1 : -1;
};

export type CardTypes =
  | 'fiveOfAKind'
  | 'fourOfAKind'
  | 'fullHouse'
  | 'threeOfAKind'
  | 'twoPairs'
  | 'onePair'
  | 'highCard';

const cardTypes: Array<{
  type: CardTypes;
  isOfType: (map: Partial<Record<Cards, number>>) => boolean;
}> = [
  {
    type: 'onePair',
    isOfType: (map) => {
      return (
        Object.values(map).filter((value) => value === 2).length === 1 &&
        !Object.values(map).includes(3)
      );
    },
  },
  {
    type: 'twoPairs',
    isOfType: (map) => {
      return Object.values(map).filter((value) => value === 2).length === 2;
    },
  },
  {
    type: 'threeOfAKind',
    isOfType: (map) => {
      return Object.values(map).includes(3) && !Object.values(map).includes(2);
    },
  },
  {
    type: 'fullHouse',
    isOfType: (map) => {
      return Object.values(map).includes(3) && Object.values(map).includes(2);
    },
  },
  {
    type: 'fourOfAKind',
    isOfType: (map) => {
      return Object.values(map).includes(4);
    },
  },
  {
    type: 'fiveOfAKind',
    isOfType: (map) => {
      return Object.values(map).includes(5);
    },
  },
];

export const compareTypes = (a: CardTypes, b: CardTypes): number => {
  const aIndex = cardTypes.findIndex(({ type }) => type === a);
  const bIndex = cardTypes.findIndex(({ type }) => type === b);
  if (aIndex === bIndex) {
    return 0;
  }
  return aIndex > bIndex ? 1 : -1;
};

export const getType = (map: Partial<Record<Cards, number>>): CardTypes => {
  return cardTypes.find((type) => type.isOfType(map))?.type || 'highCard';
};

export const parseInput = (input: string) =>
  split(input).map((line) => {
    const lineData = line.split(' ');
    const cards = lineData[0].split('') as Cards[];
    return {
      hand: lineData[0],
      type: getType(
        cards.reduce(
          (acc, card) => {
            if (acc[card]) {
              acc[card] += 1;
            } else {
              acc[card] = 1;
            }
            return acc;
          },
          {} as Record<Cards, number>
        )
      ),
      bid: Number(lineData[1]),
    };
  });
