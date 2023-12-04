export const getNumbers = (line: string): [string, string[], string[]] => {
  const [cardIdx, numbers] = line.split(':');
  const [winning, card] = numbers
    .split('|')
    .map((x) => x.split(' ').filter(Boolean));
  return [cardIdx.split(' ').filter(Boolean)[1], winning, card];
};
