export const chunk = <T>(input: T[], size: number): T[][] => {
  return input.reduce((arr: T[][], item: T, idx: number): T[][] => {
    return idx % size === 0
      ? [...arr, [item]]
      : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
  }, []);
};
