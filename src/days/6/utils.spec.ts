import { describe, expect, it } from 'vitest';
import { checkDistance, parseInput, parseInput2 } from './utils';
import readFile from '../../utils/readFile';

describe('utils', () => {
  describe('parseInput', () => {
    it('should work', async () => {
      const input = await readFile(`${__dirname}/input1.txt`);
      expect(parseInput(input)).toEqual([
        { time: 7, distance: 9 },
        { time: 15, distance: 40 },
        { time: 30, distance: 200 },
      ]);
    });
  });

  describe('parseInput2', () => {
    it('should work', async () => {
      const input = await readFile(`${__dirname}/input1.txt`);
      expect(parseInput2(input)).toEqual([{ time: 71530, distance: 940200 }]);
    });
  });

  describe('checkDistance', () => {
    it('should properly calculate distance', () => {
      expect(checkDistance(7, 7)).toBe(0);
      expect(checkDistance(7, 6)).toBe(6);
      expect(checkDistance(7, 5)).toBe(10);
      expect(checkDistance(7, 4)).toBe(12);
      expect(checkDistance(7, 3)).toBe(12);
      expect(checkDistance(7, 2)).toBe(10);
      expect(checkDistance(7, 1)).toBe(6);
      expect(checkDistance(7, 0)).toBe(0);
    });
  });
});
