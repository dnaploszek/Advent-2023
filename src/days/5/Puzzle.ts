import { parseInput, parseInput2, mapRanges, mapSeed } from './utils';

const first = (input: string) => {
  const { seeds, ranges } = parseInput(input);
  const locations = seeds.map((seed) =>
    ranges.reduce((acc, range) => mapSeed(acc, range), seed)
  );
  return Math.min(...locations);
};

const second = (input: string) => {
  const { seedRanges, ranges } = parseInput2(input);
  const locationRanges = ranges.reduce(
    (acc, range) => mapRanges(acc, range),
    seedRanges
  );
  return Math.min(...locationRanges.map((range) => range[0]));
};

export { first, second };
