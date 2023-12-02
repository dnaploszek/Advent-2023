import { split } from '../../utils/split';
import { countSet } from './utils';

const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;

const first = (input: string) =>
  split(input).reduce((acc, game, index) => {
    const gameId = index + 1;
    const gameInput = game.split(':')[1].trim();
    const isPossible = gameInput.split(';').every((set) => {
      const { red, green, blue } = countSet(set.trim());
      return red <= maxRed && green <= maxGreen && blue <= maxBlue;
    });
    if (isPossible) {
      return acc + gameId;
    }
    return acc;
  }, 0);

const second = (input: string) =>
  split(input).reduce((acc, game, index) => {
    const gameInput = game.split(':')[1].trim();
    const maxCubes = gameInput.split(';').reduce(
      (acc, set) => {
        const { red, green, blue } = countSet(set.trim());
        return {
          red: acc.red < red ? red : acc.red,
          green: acc.green < green ? green : acc.green,
          blue: acc.blue < blue ? blue : acc.blue,
        };
      },
      {
        red: 0,
        green: 0,
        blue: 0,
      }
    );
    const power = maxCubes.red * maxCubes.green * maxCubes.blue;
    return acc + power;
  }, 0);

export { first, second };
