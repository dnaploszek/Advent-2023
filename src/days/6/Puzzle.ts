import { checkDistance, parseInput, parseInput2 } from './utils';

const first = (input: string) => {
  const races = parseInput(input);
  return races.reduce((acc, race) => {
    for (let i = 0; i < race.time; i++) {
      if (checkDistance(race.time, i) > race.distance) {
        const possibleWins = race.time + 1 - 2 * i;
        return acc * possibleWins;
      }
    }
  }, 1);
};

const second = (input: string) => {
  const races = parseInput2(input);
  return races.reduce((acc, race) => {
    for (let i = 0; i < race.time; i++) {
      if (checkDistance(race.time, i) > race.distance) {
        const possibleWins = race.time + 1 - 2 * i;
        return acc * possibleWins;
      }
    }
  }, 1);
};

export { first, second };
