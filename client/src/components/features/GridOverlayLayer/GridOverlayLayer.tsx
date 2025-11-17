import React from 'react';
import { GridOverlayLayerProps } from '/components/features/GridOverlayLayer/types';
import { Layer, Shape } from 'react-konva';
import { gridLineX, gridLineY, stageSize } from '/utils/grid';

const GridOverlayLayer = (props: GridOverlayLayerProps) => {
  const { gridWidth, gridHeight, cellSize, visible } = props;

  const { stageW, stageH } = stageSize(gridWidth, gridHeight, cellSize);

  return (
    <Layer opacity={visible ? 1 : 0} listening={false}>
      <Shape
        listening={false}
        perfectDrawEnabled={false}
        shadowForStrokeEnabled={false}
        strokeScaleEnabled={false}
        sceneFunc={(ctx, shape) => {
          const color = '#9e9e9b';
          ctx.beginPath();
          ctx.strokeStyle = color;
          ctx.lineWidth = 1;

          for (let x = 0; x <= gridWidth; x++) {
            const px = gridLineX(x, gridWidth, cellSize, stageW);
            ctx.moveTo(px, 0);
            ctx.lineTo(px, stageH);
          }

          for (let y = 0; y <= gridHeight; y++) {
            const py = gridLineY(y, gridHeight, cellSize, stageH);

            ctx.moveTo(stageW, py);
            ctx.lineTo(0, py);
          }

          ctx.stroke();
          ctx.fillStrokeShape(shape);
        }}
      />
    </Layer>
  );
};

export default GridOverlayLayer;
