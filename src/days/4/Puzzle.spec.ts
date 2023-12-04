import { describe, expect, it } from 'vitest';

import readFile from '../../utils/readFile';

import { first, second } from './Puzzle';

describe('Puzzle', () => {
  it('solves part 1', async () => {
    const input = await readFile(`${__dirname}/input1.txt`);
    expect(first(input)).toBe(13);
  });

  it('solves part 2', async () => {
    const input = await readFile(`${__dirname}/input2.txt`);
    expect(second(input)).toBe(30);
  });

  it('solves part 2 - pitfall (last scratch card wins but will not add score!)', async () => {
    const input = await readFile(`${__dirname}/input3.txt`);
    expect(second(input)).toBe(30);
  });
});
