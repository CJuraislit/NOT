import React from 'react';
import { Stage } from 'react-konva';
import { PixelGridPreviewProps } from '/components/features/PixelGridPreview/types';
import SolvedCellsLayer from '/components/features/SolvedCellLayer/SolvedCellsLayer';
import { stageSize } from '/utils/grid';

const PixelGridPreview = (props: PixelGridPreviewProps) => {
  const { gridWidth, gridHeight, cellSize = 6, solvedCoords, solvedCount, isCompleted } = props;

  const { stageW, stageH } = stageSize(gridWidth, gridHeight, cellSize);

  return (
    <Stage width={stageW} height={stageH}>
      <SolvedCellsLayer
        gridWidth={gridWidth}
        gridHeight={gridHeight}
        cellSize={cellSize}
        solvedCoords={solvedCoords}
      />
    </Stage>
  );
};

export default PixelGridPreview;
