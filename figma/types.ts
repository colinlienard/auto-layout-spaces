export type Unit = 'px' | 'rem';

export type Spacings = 'all' | 'spacing-between-items' | 'paddings';

export type UIMessage = {
  type: 'show' | 'hide' | 'unit' | 'spacings' | 'hide-on-exit';
  value?: Unit | number | Spacings | boolean;
};

export type Color = [number, number, number];
