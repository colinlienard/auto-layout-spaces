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

// Generate a random number between 0, 0.25, 0.5, 0.75 and 1
const random = () => Math.round(Math.random() * 4) / 4;

const valueColors: Map<number, Color> = new Map();

export const getRandomColor = (value: number): Color => {
  // If the value is already associated to a color
  if (valueColors.has(value)) {
    return valueColors.get(value) as Color;
  }

  const color = [random(), random(), random()] as Color;

  // If the color is black or white or grey, retry
  if (color[0] === color[1] && color[0] === color[2]) {
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
