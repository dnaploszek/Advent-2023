import { findFirstNum, findFirstNumWithStrings, reverseString } from './utils';
import { split } from '../../utils/split';

export const first = (input: string) =>
  split(input).reduce((acc, line) => {
    const firstNum = findFirstNum(line);
    const secondNum = findFirstNum(reverseString(line));

    acc += Number(firstNum + secondNum);
    return acc;
  }, 0);

export const second = (input: string) =>
  split(input).reduce((acc, line) => {
    const firstNum = findFirstNumWithStrings(line);
    const secondNum = findFirstNumWithStrings(reverseString(line), {
      reverse: true,
    });
    acc += Number(firstNum + secondNum);
    return acc;
  }, 0);
