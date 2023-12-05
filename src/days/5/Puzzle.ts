import { parseInput, parseInput2, mapRange } from './utils';

const first = (input: string) => {
  const { seeds, ranges } = parseInput(input);
  const locations = seeds.map((seed) =>
    ranges.reduce((acc, range) => mapRange(acc, range), seed)
  );
  return Math.min(...locations);
};

const memory: Record<number, number> = {};
const second = (input: string) => {
  const { seeds, ranges } = parseInput2(input);
  const locations = seeds.map((seed) => {
    if (memory[seed]) {
      return memory[seed];
    }
    memory[seed] = ranges.reduce((acc, range) => mapRange(acc, range), seed);
    return memory[seed];
  });
  console.log(seeds, locations);
  return Math.min(...locations);
  // return 0;
};

export { first, second };
