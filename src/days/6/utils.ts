import { split } from '../../utils/split';

export const parseInput = (input: string) => {
  const data = split(input);
  const times = data[0].split(' ').filter(Boolean).slice(1);
  const distances = data[1].split(' ').filter(Boolean).slice(1);
  return times.map((time, index) => ({
    time: Number(time),
    distance: Number(distances[index]),
  }));
};

export const parseInput2 = (input: string) => {
  const data = split(input);
  const time = data[0].split(':')[1].replace(/ /g, '');
  const distance = data[1].split(':')[1].replace(/ /g, '');
  return [
    {
      time: Number(time),
      distance: Number(distance),
    },
  ];
};

export const checkDistance = (time: number, holding: number) => {
  const speed = holding;
  const timeLeft = time - holding;
  return timeLeft * speed;
};
