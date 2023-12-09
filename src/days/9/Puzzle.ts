import { interpolate, parseInput, reduceHistory } from './utils';

const first = (input: string) =>
  parseInput(input).reduce((acc, history) => {
    const result = interpolate(reduceHistory(history));

    return acc + result;
  }, 0);

const second = (input: string) =>
  parseInput(input).reduce((acc, history) => {
    const result = interpolate(reduceHistory(history, true), true);

    return acc + result;
  }, 0);

export { first, second };
