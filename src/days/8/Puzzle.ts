import { lcm, Node, parseInput } from './utils';

const first = (input: string) => {
  const data = parseInput(input);
  let currentNode: Node = 'AAA';
  let steps = 0;
  while (currentNode !== 'ZZZ') {
    const instruction = data.instructions[steps % data.instructions.length] as
      | 'L'
      | 'R';
    currentNode = data.nodes[currentNode][instruction];
    steps++;
  }
  return steps;
};

const second = (input: string) => {
  const data = parseInput(input);
  let steps = 0;
  let iterationNodes: Array<string | number> = [...data.startingNodes];
  while (!iterationNodes.every((node) => typeof node === 'number')) {
    const instruction = data.instructions[steps % data.instructions.length] as
      | 'L'
      | 'R';
    steps++;
    iterationNodes = iterationNodes.map((node) => {
      if (typeof node === 'number') {
        return node;
      }
      const newNode = data.nodes[node][instruction];
      if (newNode.endsWith('Z')) {
        return steps;
      }
      return newNode;
    });
  }

  return lcm(iterationNodes as Array<number>);
};

export { first, second };
