import { describe, expect, it } from 'vitest';
import {
  findFirstNum,
  findFirstNumWithStrings,
  isNotNum,
  reverseString,
  stringNumberToNumber,
  stringNums,
} from './utils';

describe('utils', () => {
  describe('isNotNum', () => {
    it('returns false for numbers', () => {
      expect(isNotNum('1')).toBe(false);
    });

    it('returns true for non numbers', () => {
      expect(isNotNum('a')).toBe(true);
      expect(isNotNum('D')).toBe(true);
    });
  });

  describe('findFirstNum', () => {
    it('returns the first number in a string', () => {
      expect(findFirstNum('abc123')).toBe('1');
      expect(findFirstNum('3dsad')).toBe('3');
    });
  });

  describe('stringNumberToNumber', () => {
    it('returns the first number in a string', () => {
      stringNums.forEach((stringNum) => {
        expect(stringNumberToNumber(0, `${stringNum}test`, false)).toBe(
          String(stringNums.indexOf(stringNum))
        );
      });
    });

    it('returns the first number in a string in reverse mode', () => {
      stringNums.forEach((stringNum) => {
        expect(
          stringNumberToNumber(0, `${reverseString(stringNum)}test`, true)
        ).toBe(String(stringNums.indexOf(stringNum)));
      });
    });

    it('returns the first number in a string when it is in the center of the string', () => {
      expect(stringNumberToNumber(5, 'hellothreestring')).toBe('3');
    });

    it('returns empty string when no number present', () => {
      expect(stringNumberToNumber(5, 'hellothrestring')).toBe('');
    });
  });

  describe('findFirstNumWithStrings', () => {
    it('returns the first number in a string', () => {
      expect(findFirstNumWithStrings('onetest')).toBe('1');
      expect(findFirstNumWithStrings('2onetest')).toBe('2');
      expect(findFirstNumWithStrings('three2onetest')).toBe('3');
      expect(findFirstNumWithStrings('oneight')).toBe('1');
    });

    it('returns empty string when no number present', () => {
      expect(findFirstNumWithStrings('oetest')).toBe('');
    });
  });
});
