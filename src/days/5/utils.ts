export const mapRange = (
  input: number,
  ranges: Array<[number, number, number]>
) => {
  const matchingRange = ranges.find((range) => {
    const source = range[1];
    const length = range[2];
    const lastInRange = source + length - 1;
    return input >= source && input <= lastInRange;
  });
  if (!matchingRange) {
    return input;
  }
  const target = matchingRange[0];
  const source = matchingRange[1];
  return target + (input - source);
};
const getRanges = (data: Array<string>) => {
  return data.slice(1).map((mapper) => {
    const mapperData = mapper.split('\r\n');
    return mapperData
      .slice(1)
      .map((line) => line.split(' ').map(Number) as [number, number, number])
      .sort((a, b) => a[1] - b[1]);
  });
};

export const parseInput = (
  input: string
): { seeds: Array<number>; ranges: Array<Array<[number, number, number]>> } => {
  const data = input.split('\r\n\r\n');
  const seeds = data[0].split(':')[1].trim().split(' ').map(Number);

  return {
    seeds,
    ranges: getRanges(data),
  };
};
export const parseInput2 = (
  input: string
): { seeds: Array<number>; ranges: Array<Array<[number, number, number]>> } => {
  const data = input.split('\r\n\r\n');
  const seeds = data[0].split(':')[1].trim().split(' ');
  let resultSeeds = [];
  for (let i = 0; i < seeds.length; i = i + 2) {
    const seed = seeds[i];
    const length = Number(seeds[i + 1]);
    for (let j = 0; j < length; j++) {
      resultSeeds.push(Number(seed) + j);
    }
  }
  return {
    seeds: resultSeeds,
    ranges: getRanges(data),
  };
};
