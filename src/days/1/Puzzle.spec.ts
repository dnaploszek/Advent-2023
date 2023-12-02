import { describe, expect, it } from 'vitest';

import readFile from '../../utils/readFile';

import { first, second } from './Puzzle';

describe('Puzzle 1', () => {
  it('solves part 1', async () => {
    const input = await readFile(`${__dirname}/input1.txt`);
    expect(first(input)).toBe(142);
  });

  it('solves part 2', async () => {
    const input = await readFile(`${__dirname}/input2.txt`);
    expect(second(input)).toBe(281);
  });
});
