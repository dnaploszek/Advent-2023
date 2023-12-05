import { describe, expect, it } from 'vitest';

import { mapRange, parseInput, parseInput2 } from './utils';
import readFile from '../../utils/readFile';

describe('utils', () => {
  describe('mapRange', () => {
    it('should map ranges', () => {
      const ranges = [
        [50, 98, 2],
        [52, 50, 48],
      ] as Array<[number, number, number]>;
      expect(mapRange(1, ranges)).toBe(1);
      expect(mapRange(51, ranges)).toBe(53);
      expect(mapRange(99, ranges)).toBe(51);
    });
  });

  describe('parseInput', () => {
    it('should properly parse input', async () => {
      const input = await readFile(`${__dirname}/parseInputTest.txt`);
      expect(parseInput(input)).toEqual({
        seeds: [79, 2, 90, 1],
        ranges: [
          [
            [52, 50, 48],
            [50, 98, 2],
          ],
          [
            [39, 0, 15],
            [0, 15, 37],
            [37, 52, 2],
          ],
        ],
      });
    });
  });

  describe('parseInput2', () => {
    it('should properly parse input', async () => {
      const input = await readFile(`${__dirname}/parseInputTest.txt`);
      expect(parseInput2(input)).toEqual({
        seeds: [79, 80, 90],
        ranges: [
          [
            [52, 50, 48],
            [50, 98, 2],
          ],
          [
            [39, 0, 15],
            [0, 15, 37],
            [37, 52, 2],
          ],
        ],
      });
    });
  });
});
