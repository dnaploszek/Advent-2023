import { createLinkedList, parseInput, printMap } from './utils';

const first = (input: string) => {
  const { start, pipes } = parseInput(input);
  let listNode = createLinkedList(pipes, start);
  let i = 0;
  let maxDistance = 0;
  // traverse backwards to find longest distance
  do {
    i++;
    listNode = listNode.prev;
    listNode.distance = Math.min(listNode.distance, i);
    maxDistance = Math.max(maxDistance, listNode.distance);
  } while (!listNode.isStart);
  return maxDistance;
};

// lazy my S is actually an F
const lazySDetector = 'F';
const second = (input: string) => {
  const { start, pipes } = parseInput(input);
  createLinkedList(pipes, start); // just to mark pipes as part of loop

  let inside = false;
  let count = 0;
  for (let y = 0; y < pipes.length; y++) {
    for (let x = 0; x < pipes[y].length; x++) {
      if (!inside && !pipes[y][x].isPartOfLoop) {
        pipes[y][x].isFlooded = true;
      }
      if (inside && !pipes[y][x].isPartOfLoop) {
        count++;
      }
      if (!pipes[y][x].isPartOfLoop) {
        continue;
      }
      const currentPipeType = pipes[y][x].type;
      if (
        currentPipeType === '|' ||
        currentPipeType === 'F' ||
        currentPipeType === 'S' ||
        currentPipeType === '7'
      ) {
        inside = !inside;
      }
    }
  }
  printMap(pipes);
  return count;
};

export { first, second };
