import { describe, expect, it } from 'vitest';
import { parseInput } from './utils';
import readFile from '../../utils/readFile';

describe('utils', () => {
  describe('parseInput', () => {
    it('should properly parse input', async () => {
      const input = await readFile(`${__dirname}/input1.txt`);
      expect(parseInput(input)).toEqual({
        pipes: [
          [
            {
              connections: [],
              isBroken: true,
            },
            {
              connections: [],
              isBroken: true,
            },
            {
              connections: [],
              isBroken: true,
            },
            {
              connections: [],
              isBroken: true,
            },
            {
              connections: [],
              isBroken: true,
            },
          ],
          [
            {
              connections: [],
              isBroken: true,
            },
            {
              connections: [
                {
                  x: 2,
                  y: 1,
                },
                {
                  x: 1,
                  y: 2,
                },
              ],
              isBroken: false,
            },
            {
              connections: [
                {
                  x: 3,
                  y: 1,
                },
                {
                  x: 1,
                  y: 1,
                },
              ],
              isBroken: false,
            },
            {
              connections: [
                {
                  x: 2,
                  y: 1,
                },
                {
                  x: 3,
                  y: 0,
                },
              ],
              isBroken: true,
            },
            {
              connections: [],
              isBroken: true,
            },
          ],
          [
            {
              connections: [],
              isBroken: true,
            },
            {
              connections: [
                {
                  x: 1,
                  y: 3,
                },
                {
                  x: 1,
                  y: 1,
                },
              ],
              isBroken: true,
            },
            {
              connections: [],
              isBroken: true,
            },
            {
              connections: [
                {
                  x: 3,
                  y: 3,
                },
                {
                  x: 3,
                  y: 1,
                },
              ],
              isBroken: true,
            },
            {
              connections: [],
              isBroken: true,
            },
          ],
          [
            {
              connections: [],
              isBroken: true,
            },
            {
              connections: [
                {
                  x: 2,
                  y: 3,
                },
                {
                  x: 1,
                  y: 4,
                },
              ],
              isBroken: true,
            },
            {
              connections: [
                {
                  x: 3,
                  y: 3,
                },
                {
                  x: 1,
                  y: 3,
                },
              ],
              isBroken: false,
            },
            {
              connections: [
                {
                  x: 2,
                  y: 3,
                },
                {
                  x: 3,
                  y: 4,
                },
              ],
              isBroken: true,
            },
            {
              connections: [],
              isBroken: true,
            },
          ],
          [
            {
              connections: [],
              isBroken: true,
            },
            {
              connections: [],
              isBroken: true,
            },
            {
              connections: [],
              isBroken: true,
            },
            {
              connections: [],
              isBroken: true,
            },
            {
              connections: [],
              isBroken: true,
            },
          ],
        ],
        start: {
          x: 1,
          y: 1,
        },
      });
    });
  });
});
