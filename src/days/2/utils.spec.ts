import { describe, expect, it } from 'vitest';
import { countSet } from './utils';
describe('utils', () => {
  describe('countSet', () => {
    it('should count sets properly', () => {
      expect(countSet('1 green, 2 red, 3 blue')).toEqual({
        green: 1,
        red: 2,
        blue: 3,
      });
    });
  });
});
