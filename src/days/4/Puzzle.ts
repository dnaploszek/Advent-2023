import { split } from '../../utils/split';
import { getNumbers } from './utils';

const first = (input: string) =>
  split(input).reduce((acc, line) => {
    const [_cardId, winning, card] = getNumbers(line);
    acc += card.reduce((acc, num) => {
      if (winning.includes(num)) {
        acc = acc ? acc * 2 : 1;
      }
      return acc;
    }, 0);
    return acc;
  }, 0);

const second = (input: string) =>
  Object.values(
    split(input).reduce<Record<string, number>>((acc, line, _index, arr) => {
      const maxCard = arr.length;
      const [cardId, winning, card] = getNumbers(line);
      acc[cardId] = (acc[cardId] || 0) + 1;

      const wins = card.reduce((acc, num) => {
        if (winning.includes(num)) {
          acc += 1;
        }
        return acc;
      }, 0);
      const currentCard = Number(cardId);
      for (let i = currentCard + 1; i <= currentCard + wins; i++) {
        if (i <= maxCard) {
          acc[i] = (acc[i] || 0) + acc[cardId];
        }
      }
      return acc;
    }, {})
  ).reduce((acc, num) => acc + num, 0);

export { first, second };
