import { describe, expect, it } from 'vitest';
import { parseInput } from './utils';
import readFile from '../../utils/readFile';

describe('utils', () => {
  describe('parseInput', () => {
    it('should properly parse input', async () => {
      const input = await readFile(`${__dirname}/input1.txt`);
      expect(parseInput(input)).toEqual('');
    });
  });
});
