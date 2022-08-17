figma.showUI(__html__);

figma.ui.onmessage = () => {
  const nodes = figma.currentPage.findAll(
    (node) => node.type === 'FRAME' && node.layoutMode !== 'NONE'
  ) as FrameNode[];

  nodes.forEach((node) => {
    const frame = figma.createFrame();
    frame.x = node.x;
    frame.y = node.y;
    frame.resize(node.width, node.paddingTop);
    frame.locked = true;

    const { width, height } = node;

    node.appendChild(frame);
    frame.layoutPositioning = 'ABSOLUTE';
    node.resize(width, height);
  });

  figma.closePlugin();
};
