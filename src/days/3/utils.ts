import { isNum } from '../1/utils';

const symbols = ['*', '-', '%', '/', '#', '&', '$', '=', '@', '+'];

export const checkValidNumber = (
  table: Array<string>,
  currentX: number,
  currentY: number
) => {
  let validNumber = false;
  for (let y = currentY - 1; y <= currentY + 1; y++) {
    for (let x = currentX - 1; x <= currentX + 1; x++) {
      if (y < 0 || x < 0 || y >= table.length || x >= table[y].length) {
        continue;
      }
      if (x === currentX && y === currentY) {
        continue;
      }
      if (symbols.includes(table[y][x])) {
        validNumber = true;
      }
    }
  }
  return validNumber;
};

export const getAdjacentNumCoords = (
  table: Array<string>,
  currentX: number,
  currentY: number
) => {
  let numberCoords: Array<{ x: number; y: number }> = [];
  for (let y = currentY - 1; y <= currentY + 1; y++) {
    for (let x = currentX - 1; x <= currentX + 1; x++) {
      if (y < 0 || x < 0 || y >= table.length || x >= table[y].length) {
        continue;
      }
      if (x === currentX && y === currentY) {
        continue;
      }
      if (isNum(table[y][x])) {
        numberCoords.push({ x, y });
      }
    }
  }
  return numberCoords;
};

export const getFullNumber = (
  string: string,
  currentX: number
): { number: number; startX: string } => {
  let number = '';
  let left = currentX;
  while (isNum(string[left])) {
    left--;
  }
  left++;
  const startX = left;
  while (isNum(string[left])) {
    number += string[left];
    left++;
  }
  return { number: Number(number), startX: String(startX) };
};
export const getGearRatio = (
  table: Array<string>,
  currentX: number,
  currentY: number
): number => {
  const adjacentNumCoords = getAdjacentNumCoords(table, currentX, currentY);
  const map = adjacentNumCoords.reduce(
    (acc, { x, y }) => {
      const { number, startX } = getFullNumber(table[y], x);
      acc[`x${startX}y${y}`] = number;
      return acc;
    },
    {} as { [key: string]: number }
  );
  const validNums = Object.values(map);
  if (validNums.length === 2) {
    return validNums[0] * validNums[1];
  }
  return 0;
};
