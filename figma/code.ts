figma.showUI(__html__);

figma.ui.onmessage = (message: string) => {
  console.log(message);
  
  figma.closePlugin();
};
