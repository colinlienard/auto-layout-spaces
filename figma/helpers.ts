import { Color } from './types';

export const rgba = (
  r: number,
  g: number,
  b: number,
  a: number = 1
): Paint[] => [
  {
    type: 'SOLID',
    color: {
      r,
      g,
      b,
    },
    opacity: a,
  },
];

const arraysAreEqual = (a: number[], b: number[]) =>
  a.every((value, index) => value === b[index]);

const valueColors: Map<number, Color> = new Map();

const random = () => {
  const r = Math.random();
  if (r < 0.33) {
    return 0;
  }
  if (r < 0.66) {
    return 0.5;
  }
  return 1;
};

export const getRandomColor = (value: number): Color => {
  // If the value is already associated to a color
  if (valueColors.get(value)) {
    return valueColors.get(value) as Color;
  }

  const color = [random(), random(), random()] as Color;

  // If the color is black or white, retry
  if (arraysAreEqual(color, [1, 1, 1]) || arraysAreEqual(color, [0, 0, 0])) {
    return getRandomColor(value);
  }

  // If the color is already used, retry
  // eslint-disable-next-line no-restricted-syntax
  for (const c of valueColors.values()) {
    if (arraysAreEqual(c, color)) {
      return getRandomColor(value);
    }
  }

  valueColors.set(value, color);
  return color;
};
