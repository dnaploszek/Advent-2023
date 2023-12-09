import { split } from '../../utils/split';

export type Node = string;
type Nodes = {
  [key: Node]: {
    L: Node;
    R: Node;
  };
};
export const parseInput = (
  input: string
): { instructions: Node; startingNodes: Array<Node>; nodes: Nodes } => {
  const data = split(input);
  const instructions: Node = data[0];
  const startingNodes: Array<Node> = [];
  const nodes = data.slice(2).reduce<Nodes>((acc, line) => {
    const [node, lr] = line.split('=');
    const [l, r] = lr
      .trim()
      .slice(1, -1)
      .split(',')
      .map((n) => n.trim());
    const nodeName = node.trim() as Node;
    if (nodeName.endsWith('A')) {
      startingNodes.push(nodeName);
    }
    acc[node.trim() as Node] = {
      L: l as Node,
      R: r as Node,
    };

    return acc;
  }, {} as Nodes);
  return { instructions, startingNodes, nodes };
};

const gcd = (a: number, b: number): number => {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
};
export const lcm = (numbers: Array<number>) => {
  return numbers.reduce((a, b) => {
    return (a * b) / gcd(a, b);
  });
};
