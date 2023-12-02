export const isNotNum = (char: string) => Number.isNaN(Number(char));
export const isNum = (char: string) => !isNotNum(char);

export const reverseString = (string: string) =>
  string.split('').reverse().join('');

export const stringNums = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];

const stringToNum: Array<
  (start: number, line: string, reverse: boolean) => string
> = stringNums.map(
  (stringNum) => (start, string, reverse) =>
    string
      .slice(start, start + stringNum.length)
      .replace(
        reverse ? reverseString(stringNum) : stringNum,
        String(stringNums.indexOf(stringNum))
      )[0]
);

export const stringNumberToNumber = (
  start: number,
  line: string,
  reverse?: boolean
): string =>
  stringToNum.reduce((acc, fn) => {
    const current = fn(start, line, reverse);
    if (isNotNum(current)) {
      return acc;
    } else {
      return current;
    }
  }, '');
export const findFirstNum = (line: string) => {
  let left = 0;
  while (isNotNum(line[left])) {
    left++;
  }
  return line[left];
};

export const findFirstNumWithStrings = (
  line: string,
  options?: { reverse: boolean }
) => {
  let left = 0;
  do {
    if (isNum(line[left])) {
      return line[left];
    }
    const num = stringNumberToNumber(left, line, options?.reverse);
    if (num) {
      return num;
    }
    left++;
  } while (left < line.length);
  return '';
};
