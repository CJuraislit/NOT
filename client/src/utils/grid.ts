export const stageSize = (w: number, h: number, cellSize: number) => ({
  stageW: w * cellSize,
  stageH: h * cellSize,
});

export const gridLineX = (x: number, gridWidth: number, cellSize: number, stageW: number) => {
  return x === 0 ? 0.5 : x === gridWidth ? stageW - 0.5 : x * cellSize + 0.5;
};

export const gridLineY = (y: number, gridHeight: number, cellSize: number, stageH: number) => {
  return y === 0 ? 0.5 : y === gridHeight ? stageH - 0.5 : y * cellSize + 0.5;
};
