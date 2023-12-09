import { split } from '../../utils/split';

export const parseInput = (input: string) =>
  split(input).map((data) => data.split(' ').map(Number));

export const reduceHistory = (history: number[], backwards?: boolean) => {
  const result = [];
  let allZero: boolean = true;
  do {
    allZero = true;
    result.push(history[backwards ? 0 : history.length - 1]);
    history = history.reduce((acc, currentNumber, index) => {
      if (index === 0) {
        return acc;
      }
      const diff = currentNumber - history[index - 1];
      if (diff !== 0) {
        allZero = false;
      }

      acc.push(diff);
      return acc;
    }, []);
  } while (allZero !== true);
  return result;
};

export const interpolate = (input: number[], backwards?: boolean) =>
  input
    .reverse()
    .reduce((acc, current) => current + (backwards ? -acc : acc), 0);
