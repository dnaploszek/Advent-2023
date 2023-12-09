import { split } from '../../utils/split';

export const cardsStrength = [
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

export const cardsStrength2 = [
  'J',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'T',
  'Q',
  'K',
  'A',
] as const;

export type Cards = (typeof cardsStrength)[number];

export const compareCards = (
  a: Cards,
  b: Cards,
  cardsOrder: Readonly<Array<Cards>>
): number => {
  const aIndex = cardsOrder.indexOf(a);
  const bIndex = cardsOrder.indexOf(b);
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
  isOfType2: (map: Partial<Record<Cards, number>>) => boolean;
}> = [
  {
    type: 'onePair',
    isOfType: (map) => {
      return (
        Object.values(map).filter((value) => value === 2).length === 1 &&
        !Object.values(map).includes(3)
      );
    },
    isOfType2: (map) => {
      const { J, ...rest } = map;
      const onlyOnes =
        J === 1 &&
        Object.values(rest).filter((value) => value === 1).length === 4;
      return (
        onlyOnes ||
        (Object.values(map).filter((value) => value === 2).length === 1 &&
          !Object.values(map).includes(3))
      );
    },
  },
  {
    type: 'twoPairs',
    isOfType: (map) => {
      return Object.values(map).filter((value) => value === 2).length === 2;
    },
    isOfType2: (map) => {
      const { J, ...rest } = map;
      return (
        !J && Object.values(rest).filter((value) => value === 2).length === 2
      );
    },
  },
  {
    type: 'threeOfAKind',
    isOfType: (map) => {
      return Object.values(map).includes(3) && !Object.values(map).includes(2);
    },
    isOfType2: (map) => {
      const { J, ...rest } = map;
      const max = Math.max(...Object.values(rest));

      return max + (J || 0) === 3;
    },
  },
  {
    type: 'fullHouse',
    isOfType: (map) => {
      return Object.values(map).includes(3) && Object.values(map).includes(2);
    },
    isOfType2: (map) => {
      const { J, ...rest } = map;
      const normalFullHouse =
        J === undefined &&
        Object.values(map).includes(3) &&
        Object.values(map).includes(2);

      const JHouse =
        J === 1 &&
        Object.values(map).filter((value) => value === 2).length === 2;

      return normalFullHouse || JHouse;
    },
  },
  {
    type: 'fourOfAKind',
    isOfType: (map) => {
      return Object.values(map).includes(4);
    },
    isOfType2: (map) => {
      const { J, ...rest } = map;
      const max = Math.max(...Object.values(rest));
      return max + (J || 0) === 4;
    },
  },
  {
    type: 'fiveOfAKind',
    isOfType: (map) => {
      return Object.values(map).includes(5);
    },
    isOfType2: (map) => {
      const { J, ...rest } = map;
      const max = Math.max(...Object.values(rest));
      return max + (J || 0) >= 5 || J === 5;
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

export const getType = (map: Partial<Record<Cards, number>>): CardTypes =>
  [...cardTypes].reverse().find((type) => type.isOfType(map))?.type ||
  'highCard';

export const getType2 = (map: Partial<Record<Cards, number>>): CardTypes =>
  [...cardTypes].reverse().find((type) => type.isOfType2(map))?.type ||
  'highCard';
export const parseInput = (input: string, getTypeFunc: typeof getType) =>
  split(input).map((line) => {
    const lineData = line.split(' ');
    const cards = lineData[0].split('') as Cards[];
    return {
      hand: lineData[0],
      handSort: cards
        .sort((a, b) => compareCards(a, b, cardsStrength2))
        .join(''),
      type: getTypeFunc(
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
