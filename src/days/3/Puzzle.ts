import { split } from '../../utils/split';
import { isNum } from '../1/utils';
import { checkValidNumber, getGearRatio } from './utils';

const first = (input: string) => {
  const data = split(input);
  return data.reduce((acc, line, lineIndex) => {
    let left = 0;
    do {
      let num = '';
      let validNumber = false;
      while (isNum(line[left]) && left < line.length) {
        num += line[left];
        if (!validNumber) {
          validNumber = checkValidNumber(data, left, lineIndex);
        }
        left++;
      }
      if (validNumber && num.length > 0) {
        acc += Number(num);
      }
      left++;
    } while (left < line.length);
    return acc;
  }, 0);
};
const second = (input: string) => {
  const data = split(input);
  return data.reduce((acc, line, lineIndex) => {
    let left = 0;
    do {
      if (line[left] === '*') {
        acc += getGearRatio(data, left, lineIndex);
      }
      left++;
    } while (left < line.length);
    return acc;
  }, 0);
};

export { first, second };
