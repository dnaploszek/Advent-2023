import { describe, expect, it } from 'vitest';
import {
  cardsStrength,
  compareCards,
  compareTypes,
  getType,
  getType2,
  parseInput,
} from './utils';
import readFile from '../../utils/readFile';

describe('utils', () => {
  describe('parseInput', () => {
    it('should properly parse input', async () => {
      const input = await readFile(`${__dirname}/input1.txt`);
      expect(parseInput(input, getType)).toEqual([
        {
          bid: 765,
          hand: '32T3K',
          type: 'onePair',
        },
        {
          bid: 684,
          hand: 'T55J5',
          type: 'threeOfAKind',
        },
        {
          bid: 28,
          hand: 'KK677',
          type: 'twoPairs',
        },
        {
          bid: 220,
          hand: 'KTJJT',
          type: 'twoPairs',
        },
        {
          bid: 483,
          hand: 'QQQJA',
          type: 'threeOfAKind',
        },
      ]);
    });
  });

  describe('compareCards', () => {
    it('should properly compare cards', () => {
      expect(compareCards('A', 'K', cardsStrength)).toBe(1);

      expect(compareCards('J', '4', cardsStrength)).toBe(1);
      expect(compareCards('5', '6', cardsStrength)).toBe(-1);
      expect(compareCards('4', '4', cardsStrength)).toBe(0);
    });
  });

  describe('compareTypes', () => {
    it('should properly compare types', () => {
      expect(compareTypes('fiveOfAKind', 'fourOfAKind')).toBe(1);

      expect(compareTypes('fullHouse', 'twoPairs')).toBe(1);
      expect(compareTypes('onePair', 'threeOfAKind')).toBe(-1);
      expect(compareTypes('fiveOfAKind', 'fiveOfAKind')).toBe(0);
    });
  });

  describe('getType', () => {
    it('should properly detect onePair', () => {
      expect(getType({ '2': 1, '3': 1, '4': 1, K: 2 })).toBe('onePair');
    });

    it('should properly detect twoPairs', () => {
      expect(getType({ '2': 1, '4': 2, K: 2 })).toBe('twoPairs');
    });

    it('should properly detect threeOfAKind', () => {
      expect(getType({ '2': 1, '4': 1, K: 3 })).toBe('threeOfAKind');
    });

    it('should properly detect fullHouse', () => {
      expect(getType({ '2': 2, K: 3 })).toBe('fullHouse');
    });

    it('should properly detect fourOfAKind', () => {
      expect(getType({ '2': 4, K: 1 })).toBe('fourOfAKind');
    });

    it('should properly detect fiveOfAKind', () => {
      expect(getType({ '2': 5 })).toBe('fiveOfAKind');
    });

    it('should properly detect highCard', () => {
      expect(getType({ '2': 1, '3': 1, '4': 1, K: 1, Q: 1 })).toBe('highCard');
    });
  });

  describe('getType2', () => {
    it('should properly detect onePair', () => {
      expect(getType2({ '2': 1, '3': 1, '4': 1, K: 1, J: 1 })).toBe('onePair');
    });

    it('should properly detect twoPairs', () => {
      expect(getType2({ '2': 1, '4': 2, K: 2 })).toBe('twoPairs');
    });

    it('should properly detect threeOfAKind', () => {
      expect(getType2({ '2': 1, '4': 1, K: 2, J: 1 })).toBe('threeOfAKind');
      expect(getType2({ '2': 1, '4': 1, K: 3 })).toBe('threeOfAKind');
    });

    it('should properly detect fullHouse', () => {
      expect(getType2({ '2': 2, K: 2, J: 1 })).toBe('fullHouse');
    });

    it('should properly detect fourOfAKind', () => {
      expect(getType2({ '2': 2, J: 2, K: 1 })).toBe('fourOfAKind');
      expect(getType2({ '2': 4, K: 1 })).toBe('fourOfAKind');
    });

    it('should properly detect fiveOfAKind', () => {
      expect(getType2({ '3': 3, J: 2 })).toBe('fiveOfAKind');
      expect(getType2({ J: 5 })).toBe('fiveOfAKind');
      expect(getType2({ K: 5 })).toBe('fiveOfAKind');
    });

    it('should properly detect highCard', () => {
      expect(getType2({ '2': 1, '3': 1, '4': 1, K: 1, Q: 1 })).toBe('highCard');
    });
  });
});
