import { describe, expect, it } from 'vitest';

import { mapSeed, mapRanges, parseInput, parseInput2 } from './utils';
import readFile from '../../utils/readFile';

describe('utils', () => {
  describe('mapSeed', () => {
    it('should map seeds', () => {
      const ranges = [
        [50, 98, 2],
        [52, 50, 48],
      ] as Array<[number, number, number]>;
      expect(mapSeed(1, ranges)).toBe(1);
      expect(mapSeed(51, ranges)).toBe(53);
      expect(mapSeed(99, ranges)).toBe(51);
    });
  });

  describe('mapRanges', () => {
    it('should map ranges with partial intersections', () => {
      const ranges = [[52, 50, 5]] as Array<[number, number, number]>;
      // left intersection
      expect(mapRanges([[48, 51]], ranges)).toEqual([
        [48, 49],
        [52, 53],
      ]);
      // right intersection
      expect(mapRanges([[54, 60]], ranges)).toEqual([
        [55, 60],
        [56, 56],
      ]);
    });

    it('should map ranges inside of seed range', () => {
      const ranges = [
        [50, 98, 2],
        [52, 50, 48],
      ] as Array<[number, number, number]>;
      expect(mapRanges([[51, 53]], ranges)).toEqual([[53, 55]]);
    });

    it('should map ranges containing the seed range', () => {
      const ranges = [[52, 50, 3]] as Array<[number, number, number]>;
      expect(mapRanges([[48, 55]], ranges)).toEqual([
        [48, 49],
        [53, 55],
        [52, 54],
      ]);
    });

    it('should map ranges outside of a seed range', () => {
      const ranges = [[52, 50, 5]] as Array<[number, number, number]>;
      expect(mapRanges([[40, 45]], ranges)).toEqual([[40, 45]]);
      expect(mapRanges([[60, 65]], ranges)).toEqual([[60, 65]]);
    });

    it('should map ranges with double intersections', () => {
      const ranges = [
        [52, 50, 5],
        [58, 55, 5],
      ] as Array<[number, number, number]>;
      expect(mapRanges([[49, 56]], ranges)).toEqual([
        [49, 49],
        [52, 56],
        [58, 59],
      ]);
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
        seedRanges: [
          [79, 80],
          [90, 90],
        ],
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
