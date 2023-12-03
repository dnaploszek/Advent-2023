import { describe, expect, it } from 'vitest';
import {
  checkValidNumber,
  getAdjacentNumCoords,
  getFullNumber,
  getGearRatio,
} from './utils';

describe('utils', () => {
  describe('checkValidNumber', () => {
    it('should return true for a number that has a symbol in the surroundings', () => {
      expect(checkValidNumber(['..$', '.5.', '...'], 1, 1)).toBe(true);
    });

    it('should return false for a number that does not have a symbol in the surroundings', () => {
      expect(checkValidNumber(['...', '.5.', '...'], 1, 1)).toBe(false);
    });

    it('handles out of bounds', () => {
      expect(checkValidNumber(['5.', '.-'], 0, 0)).toBe(true);
      expect(checkValidNumber(['5.', '..'], 0, 0)).toBe(false);
      expect(checkValidNumber(['.5', '-.'], 1, 0)).toBe(true);
      expect(checkValidNumber(['.5', '..'], 1, 0)).toBe(false);
      expect(checkValidNumber(['..', '-5'], 1, 1)).toBe(true);
      expect(checkValidNumber(['..', '.5'], 1, 1)).toBe(false);
      expect(checkValidNumber(['..', '-5'], 1, 1)).toBe(true);
      expect(checkValidNumber(['.-', '5.'], 0, 1)).toBe(true);
      expect(checkValidNumber(['..', '5.'], 0, 1)).toBe(false);
    });
  });

  describe('getAdjacentNumCoords', () => {
    it('should return the coordinates of the adjacent numbers', () => {
      expect(getAdjacentNumCoords(['541', '.*.', '...'], 1, 1)).toEqual([
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
      ]);
    });
    it('should return empty array if no numbers present', () => {
      expect(getAdjacentNumCoords(['...', '.*.', '...'], 1, 1)).toEqual([]);
    });
  });

  describe('getFullNumber', () => {
    it('should full number for string', () => {
      expect(getFullNumber('.541', 1)).toEqual({ number: 541, startX: '1' });
      expect(getFullNumber('.541', 2)).toEqual({ number: 541, startX: '1' });
      expect(getFullNumber('.541', 3)).toEqual({ number: 541, startX: '1' });
    });
  });

  describe('getGearRatio', () => {
    it('ignores single numbers', () => {
      const table = [
        '123.', // --- keep eslint from collapsing --- --- --- --- --- --- --- --- --- --- --- --- --- ---
        '...*',
        '....',
        '....',
      ];
      expect(getGearRatio(table, 1, 3)).toBe(0);
    });

    it('multiplies double numbers', () => {
      const table = [
        '123.', // --- keep eslint from collapsing --- --- --- --- --- --- --- --- --- --- --- --- --- ---
        '.*..',
        '.321',
        '....',
      ];
      expect(getGearRatio(table, 1, 1)).toBe(123 * 321);
    });

    it('ignores triple numbers', () => {
      const table = [
        '123.', // --- keep eslint from collapsing --- --- --- --- --- --- --- --- --- --- --- --- --- ---
        '.*3.',
        '.321',
        '....',
      ];
      expect(getGearRatio(table, 1, 1)).toBe(0);
    });
  });
});
