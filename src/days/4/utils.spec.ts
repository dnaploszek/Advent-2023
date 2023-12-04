import { describe, expect, it } from 'vitest';
import { getNumbers } from './utils';

describe('utils', () => {
  describe('getNumbers', () => {
    it('should properly split input', () => {
      expect(
        getNumbers('Card   1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53')
      ).toEqual([
        '1',
        ['41', '48', '83', '86', '17'],
        ['83', '86', '6', '31', '17', '9', '48', '53'],
      ]);
    });
  });
});
