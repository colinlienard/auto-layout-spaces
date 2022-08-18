import { rgba } from './helpers';

figma.showUI(__html__);

// Create a frame with a text in it
const createVisualSpace = (
  parent: FrameNode,
  x: number,
  y: number,
  width: number,
  height: number,
  space: number,
  color: [number, number, number]
): FrameNode => {
  const frame = figma.createFrame();
  parent.appendChild(frame);

  // Set parameters
  frame.layoutPositioning = 'ABSOLUTE';
  frame.x = x;
  frame.y = y;
  frame.locked = true;
  frame.layoutMode = 'HORIZONTAL';
  frame.primaryAxisAlignItems = 'CENTER';
  frame.counterAxisAlignItems = 'CENTER';
  frame.clipsContent = false;
  frame.fills = rgba(...color, 0.2);

  // Create a text centered in the frame
  const text = figma.createText();
  text.characters = `${space}px`;
  text.fills = rgba(...color);
  text.strokes = rgba(1, 1, 1);
  frame.appendChild(text);
  frame.resize(width, height);

  return frame;
};

figma.ui.onmessage = async () => {
  // Load a font to display tetx
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });

  // Get all frames with auto-layouts
  const nodes = figma.currentPage.findAll(
    (node) => node.type === 'FRAME' && node.layoutMode !== 'NONE'
  ) as FrameNode[];

  // For each node, create visual spaces for each padding
  nodes.forEach((node) => {
    const {
      width,
      height,
      children,
      itemSpacing,
      paddingBottom,
      paddingLeft,
      paddingRight,
      paddingTop,
    } = node;

    if (children.length > 1) {
      children.forEach((child, index) => {
        // Do not add a visual space fot the last child
        if (index === children.length - 1) {
          return;
        }

        // Vertical spaces
        if (node.layoutMode === 'VERTICAL') {
          createVisualSpace(
            node,
            paddingLeft,
            child.y + child.height,
            width - paddingLeft - paddingRight,
            itemSpacing,
            itemSpacing,
            [0, 0, 1]
          );
          return;
        }

        // Horizontal spaces
        createVisualSpace(
          node,
          child.x + child.width,
          paddingTop,
          itemSpacing,
          height - paddingTop - paddingBottom,
          itemSpacing,
          [0, 0, 1]
        );
      });
    }

    // If there is a padding, create a visual space
    if (paddingTop) {
      createVisualSpace(node, 0, 0, width, paddingTop, paddingTop, [1, 0, 0]);
    }
    if (paddingRight) {
      createVisualSpace(
        node,
        width - paddingRight,
        0,
        paddingRight,
        height,
        paddingRight,
        [1, 0, 0]
      );
    }
    if (paddingBottom) {
      createVisualSpace(
        node,
        0,
        height - paddingBottom,
        width,
        paddingBottom,
        paddingBottom,
        [1, 0, 0]
      );
    }
    if (paddingLeft) {
      createVisualSpace(
        node,
        0,
        0,
        paddingLeft,
        height,
        paddingLeft,
        [1, 0, 0]
      );
    }

    // Resize the node with its previous size
    node.resize(width, height);
  });
};
