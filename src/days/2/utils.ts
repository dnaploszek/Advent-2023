export const countSet = (set: string) =>
  set.split(',').reduce(
    (acc, item) => {
      const [num, color] = item.trim().split(' ');
      return {
        ...acc,
        [color]: acc[color as 'green' | 'blue' | 'red'] + Number(num),
      };
    },
    {
      green: 0,
      red: 0,
      blue: 0,
    }
  );
