import { describe, expect, it } from 'vitest';
import { interpolate, parseInput, reduceHistory } from './utils';
import readFile from '../../utils/readFile';

describe('utils', () => {
  describe('parseInput', () => {
    it('should properly parse input', async () => {
      const input = await readFile(`${__dirname}/input1.txt`);
      expect(parseInput(input)).toEqual([
        [0, 3, 6, 9, 12, 15],
        [1, 3, 6, 10, 15, 21],
        [10, 13, 16, 21, 30, 45],
      ]);
    });
  });

  describe('reduceHistory', () => {
    it('should properly reduce history', () => {
      expect(reduceHistory([0, 3, 6, 9, 12, 15])).toEqual([15, 3]);
      expect(reduceHistory([1, 3, 6, 10, 15, 21])).toEqual([21, 6, 1]);
    });

    it('should properly reduce history backwards', () => {
      expect(reduceHistory([10, 13, 16, 21, 30, 45], true)).toEqual([
        10, 3, 0, 2,
      ]);
    });
  });

  describe('interpolate', () => {
    it('should properly interpolate', () => {
      expect(interpolate([15, 3])).toEqual(18);
      expect(interpolate([21, 6, 1])).toEqual(28);
    });

    it('should properly interpolate backwards', () => {
      expect(interpolate([10, 3, 0, 2], true)).toEqual(5);
    });
  });
});
