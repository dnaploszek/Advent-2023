import {
  Cards,
  cardsStrength,
  cardsStrength2,
  compareCards,
  compareTypes,
  getType,
  getType2,
  parseInput,
} from './utils';

const first = (input: string) => {
  const sort = parseInput(input, getType).sort((a, b) => {
    const resolveTypes = compareTypes(a.type, b.type);
    if (resolveTypes !== 0) {
      return compareTypes(a.type, b.type);
    }
    for (let i = 0; i < 5; i++) {
      const resolveCards = compareCards(
        a.hand[i] as Cards,
        b.hand[i] as Cards,
        cardsStrength
      );
      if (resolveCards !== 0) {
        return resolveCards;
      }
    }
  });

  return sort.reduce((acc, { bid }, index) => acc + bid * (index + 1), 0);
};

const second = (input: string) => {
  const sort = parseInput(input, getType2).sort((a, b) => {
    const resolveTypes = compareTypes(a.type, b.type);
    if (resolveTypes !== 0) {
      return compareTypes(a.type, b.type);
    }
    for (let i = 0; i < 5; i++) {
      const resolveCards = compareCards(
        a.hand[i] as Cards,
        b.hand[i] as Cards,
        cardsStrength2
      );
      if (resolveCards !== 0) {
        return resolveCards;
      }
    }
  });

  return sort.reduce((acc, { bid }, index) => acc + bid * (index + 1), 0);
};

export { first, second };
