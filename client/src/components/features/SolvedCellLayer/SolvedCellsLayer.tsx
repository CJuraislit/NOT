import React, { useMemo } from 'react';
import { Group, Layer, Shape } from 'react-konva';
import { SolvedCellLayerProps } from '/components/features/SolvedCellLayer/types';
import { coordsToBuffer } from '/utils/coords';

const SolvedCellsLayer = (props: SolvedCellLayerProps) => {
  const { gridWidth, gridHeight, cellSize, solvedCoords } = props;

  const buf = useMemo(() => coordsToBuffer(solvedCoords, gridWidth), [solvedCoords, gridWidth]);

  return (
    <Layer listening={false}>
      <Group scale={{ x: cellSize, y: cellSize }}>
        <Shape
          listening={false}
          shadowForStrokeEnabled={false}
          perfectDrawEnabled={false}
          sceneFunc={(ctx, shape) => {
            ctx.fillStyle = '#f9f9f8';
            ctx.fillRect(0, 0, gridWidth, gridHeight);

            ctx.fillStyle = '#141412';
            for (let i = 0; i < buf.length; i += 2) {
              ctx.fillRect(buf[i], buf[i + 1], 1, 1);
            }
            ctx.fillStrokeShape(shape);
          }}
        />
      </Group>
    </Layer>
  );
};

export default SolvedCellsLayer;
