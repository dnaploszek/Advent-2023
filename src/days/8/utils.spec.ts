import { describe, expect, it } from 'vitest';
import { lcm, parseInput } from './utils';
import readFile from '../../utils/readFile';

describe('utils', () => {
  describe('parseInput', () => {
    it('should properly parse input', async () => {
      const input = await readFile(`${__dirname}/input1.txt`);
      expect(parseInput(input)).toEqual({
        instructions: 'LLR',
        startingNodes: ['AAA'],
        nodes: {
          AAA: {
            L: 'BBB',
            R: 'BBB',
          },
          BBB: {
            L: 'AAA',
            R: 'ZZZ',
          },
          ZZZ: {
            L: 'ZZZ',
            R: 'ZZZ',
          },
        },
      });
    });
    it('should properly parse input for second task', async () => {
      const input = await readFile(`${__dirname}/input2.txt`);
      expect(parseInput(input)).toEqual({
        instructions: 'LR',
        nodes: {
          '11A': {
            L: '11B',
            R: 'XXX',
          },
          '11B': {
            L: 'XXX',
            R: '11Z',
          },
          '11Z': {
            L: '11B',
            R: 'XXX',
          },
          '22A': {
            L: '22B',
            R: 'XXX',
          },
          '22B': {
            L: '22C',
            R: '22C',
          },
          '22C': {
            L: '22Z',
            R: '22Z',
          },
          '22Z': {
            L: '22B',
            R: '22B',
          },
          XXX: {
            L: 'XXX',
            R: 'XXX',
          },
        },
        startingNodes: ['11A', '22A'],
      });
    });

    describe('lcm', () => {
      it('should properly calculate least common multiple', () => {
        expect(lcm([2, 3, 4])).toBe(12);
        expect(lcm([2, 3, 4, 5])).toBe(60);
      });
    });
  });
});
