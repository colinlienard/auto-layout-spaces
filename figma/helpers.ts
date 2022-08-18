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
