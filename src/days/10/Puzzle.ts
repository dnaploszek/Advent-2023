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

const second = (input: string) => {
  const { start, pipes } = parseInput(input);
  let listNode = createLinkedList(pipes, start);
  printMap(pipes);
};

export { first, second };
