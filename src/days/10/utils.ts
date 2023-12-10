import { split } from '../../utils/split';

type Coords = {
  x: number;
  y: number;
};
type PipeType = '|' | '-' | 'L' | 'J' | '7' | 'F' | '.' | 'S';

// x right +
// y up -
const pipeDefinitions: {
  [key in PipeType]: {
    getConnections: (
      x: number,
      y: number,
      map: Array<Array<PipeType>>
    ) => Coords[];
  };
} = {
  '|': {
    getConnections: (x, y) => [
      { x: x, y: y + 1 },
      { x: x, y: y - 1 },
    ],
  },
  '-': {
    getConnections: (x, y) => [
      { x: x + 1, y: y },
      { x: x - 1, y: y },
    ],
  },

  L: {
    getConnections: (x, y) => [
      { x: x + 1, y: y },
      { x: x, y: y - 1 },
    ],
  },

  J: {
    getConnections: (x, y) => [
      { x: x - 1, y: y },
      { x: x, y: y - 1 },
    ],
  },

  '7': {
    getConnections: (x, y) => [
      { x: x - 1, y: y },
      { x: x, y: y + 1 },
    ],
  },

  F: {
    getConnections: (x, y) => [
      { x: x + 1, y: y },
      { x: x, y: y + 1 },
    ],
  },

  '.': {
    getConnections: (x, y) => [],
  },

  S: {
    getConnections: (x, y, map) => {
      // scan all 4 directions that connect to this one
      const candidates = [
        { x: x + 1, y: y },
        { x: x, y: y + 1 },
        { x: x - 1, y: y },
        { x: x, y: y - 1 },
      ];

      return candidates.filter(({ x: candidateX, y: candidateY }) => {
        if (candidateX < 0 || candidateY < 0) {
          return false;
        }
        const currentCandidateConnections = pipeDefinitions[
          map[candidateY][candidateX]
        ].getConnections(candidateX, candidateY, map);

        return currentCandidateConnections.some(
          ({ x: candidateConnectionX, y: candidateConnectionY }) =>
            candidateConnectionX === x && candidateConnectionY === y
        );
      });
    },
  },
};

type Pipe = {
  isPartOfLoop: boolean;
  isFlooded?: boolean;
  type: PipeType;
  connections: Array<Coords>;
};

export const parseInput = (
  input: string
): {
  start: Coords;
  pipes: Array<Array<Pipe>>;
} => {
  const data = split(input).map((line) => line.split('') as PipeType[]);
  let start = { x: 0, y: 0 };
  const pipes: Array<Array<Pipe>> = data.map((line, y) =>
    line.map((pipe, x) => {
      const connections = pipeDefinitions[pipe].getConnections(x, y, data);
      const pipeData = {
        isPartOfLoop: false,
        type: pipe,
        connections,
      };
      if (pipe === 'S') {
        start = { x, y };
      }
      return pipeData;
    })
  );
  return { start, pipes };
};

type ListNode = {
  isStart: boolean;
  coords: Coords;
  distance?: number;
  next: ListNode | undefined;
  prev: ListNode | undefined;
};

const getListNode = (
  prevNode: ListNode,
  coords: Coords,
  pipes: Array<Array<Pipe>>,
  startingNode: ListNode,
  iteration: number
): ListNode => {
  if (
    startingNode.coords.x === coords.x &&
    startingNode.coords.y === coords.y
  ) {
    startingNode.prev = prevNode;
    return startingNode;
  }

  const nextCoords = pipes[coords.y][coords.x].connections.find(
    ({ x, y }) => x !== prevNode.coords.x || y !== prevNode.coords.y
  );
  pipes[coords.y][coords.x].isPartOfLoop = true;

  const node: ListNode = {
    isStart: false,
    coords,
    next: undefined,
    prev: prevNode,
    distance: iteration,
  };

  node.next = getListNode(node, nextCoords, pipes, startingNode, iteration + 1);

  return node;
};
export const createLinkedList = (
  pipes: Array<Array<Pipe>>,
  start: Coords
): ListNode => {
  const startingNode: ListNode = {
    isStart: true,
    coords: start,
    next: undefined,
    prev: undefined,
    distance: 0,
  };
  pipes[start.y][start.x].isPartOfLoop = true;
  startingNode.next = getListNode(
    startingNode,
    pipes[start.y][start.x].connections[0],
    pipes,
    startingNode,
    1
  );

  return startingNode;
};

export const printMap = (pipes: Array<Array<Pipe>>) => {
  pipes.forEach((line) => {
    let lineString = '';
    line.forEach((pipe) => {
      if (pipe.isPartOfLoop) {
        lineString += pipe.type;
      } else {
        lineString += pipe.isFlooded ? 'O' : 'I';
      }
    });
    console.log(lineString);
  });
};
