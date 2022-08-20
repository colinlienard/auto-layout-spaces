export type Unit = 'px' | 'rem';

export type Spacings = 'all' | 'spacing-between-items' | 'paddings';

export type UIMessage = {
  type: 'show' | 'hide' | 'unit' | 'spacings';
  value?: Unit | number | Spacings;
};

export type Color = [number, number, number];
