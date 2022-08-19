export type Unit = 'px' | 'rem';

export type UIMessage = {
  type: 'show' | 'hide' | 'unit';
  value?: Unit | number;
};
