export const mapSeed = (
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

export const mapRanges = (
  inputs: Array<[number, number]>,
  ranges: Array<[number, number, number]>
): Array<[number, number]> =>
  inputs.reduce<Array<[number, number]>>((acc2, input) => {
    const mappedRanges = ranges.reduce<{
      toMap: Array<[number, number]>;
      mapped: Array<[number, number]>;
    }>(
      (acc, range) => {
        const source = range[1];
        const length = range[2];
        const target = range[0];
        const lastInRange = source + length - 1;

        let newToMap: Array<[number, number]> = [];
        for (let i = 0; i < acc.toMap.length; i++) {
          input = acc.toMap[i];
          if (
            (input[0] < source && input[1] < source) ||
            (input[0] > lastInRange && input[1] > lastInRange)
          ) {
            // outside of range
            newToMap.push(input);
            continue;
          }
          const diff = target - source;
          if (input[0] >= source && input[1] <= lastInRange) {
            // inside of range
            acc.mapped.push([input[0] + diff, input[1] + diff]);
            continue;
          }
          if (input[0] <= source && input[1] >= lastInRange) {
            // covers range
            newToMap.push([input[0], source - 1]);
            acc.mapped.push([source + diff, lastInRange + diff]);
            newToMap.push([lastInRange + 1, input[1]]);
            continue;
          }

          if (input[0] < source) {
            // left side of range
            newToMap.push([input[0], source - 1]);
            acc.mapped.push([source + diff, input[1] + diff]);
            continue;
          }

          // right side of range
          acc.mapped.push([input[0] + diff, lastInRange + diff]);
          newToMap.push([lastInRange + 1, input[1]]);
        }
        acc.toMap = newToMap;
        return acc;
      },
      { toMap: [input], mapped: [] }
    );

    return [...acc2, ...mappedRanges.toMap, ...mappedRanges.mapped];
  }, []);

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
): {
  seedRanges: Array<[number, number]>;
  ranges: Array<Array<[number, number, number]>>;
} => {
  const data = input.split('\r\n\r\n');
  const seeds = data[0].split(':')[1].trim().split(' ');
  let seedRanges = [];
  for (let i = 0; i < seeds.length; i = i + 2) {
    const resultSeed: [number, number] = [
      Number(seeds[i]),
      Number(seeds[i]) + Number(seeds[i + 1]) - 1,
    ];
    seedRanges.push(resultSeed);
  }
  return {
    seedRanges,
    ranges: getRanges(data),
  };
};
