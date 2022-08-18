import { rgba } from './helpers';

figma.showUI(__html__);

// Create a frame with a text in it
const createVisualSpace = (
  parent: FrameNode,
  x: number,
  y: number,
  width: number,
  height: number,
  space: number
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
  frame.fills = rgba(1, 0, 0, 0.2);

  // Create a text centered in the frame
  const text = figma.createText();
  text.characters = `${space}px`;
  text.fills = rgba(1, 0, 0);
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
      paddingBottom,
      paddingLeft,
      paddingRight,
      paddingTop,
    } = node;

    // If there is a padding, create a visual space
    if (paddingTop) {
      createVisualSpace(node, 0, 0, node.width, paddingTop, paddingTop);
    }
    if (paddingRight) {
      createVisualSpace(
        node,
        node.width - paddingRight,
        0,
        paddingRight,
        node.height,
        paddingRight
      );
    }
    if (paddingBottom) {
      createVisualSpace(
        node,
        0,
        node.height - paddingBottom,
        node.width,
        paddingBottom,
        paddingBottom
      );
    }
    if (paddingLeft) {
      createVisualSpace(node, 0, 0, paddingLeft, node.height, paddingLeft);
    }

    // Resize the node with its previous size
    node.resize(width, height);
  });
};
