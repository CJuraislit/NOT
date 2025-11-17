import React, { useCallback, useMemo } from 'react';
import { PixelGridInteractiveProps } from '/components/features/PixelGridInteractive/types';
import { usePixelSelectStore } from '/store/pixelSelcet.store';
import { Group, Layer, Rect, Shape, Stage } from 'react-konva';
import SolvedCellsLayer from '../SolvedCellLayer/SolvedCellsLayer';
import { stageSize } from '/utils/grid';
import { clientToServerCoords, serverToClientCoords } from '/utils/coords';
import GridOverlayLayer from '/components/features/GridOverlayLayer/GridOverlayLayer';

const PixelGridInteractive = (props: PixelGridInteractiveProps) => {
  const {
    gridWidth,
    gridHeight,
    cellSize = 6,
    showGrid = false,
    solvedCoords,
    isCompleted,
  } = props;

  const selectedServer = usePixelSelectStore((s) => s.selected);
  const setSelected = usePixelSelectStore((s) => s.setSelected);
  const clear = usePixelSelectStore((s) => s.clear);

  const selectedClient = useMemo(
    () =>
      selectedServer ? serverToClientCoords(selectedServer.x, selectedServer.y, gridHeight) : null,
    [selectedServer, gridHeight],
  );

  const handlePick = useCallback(
    (e: any) => {
      const pos = e.target.getStage()?.getPointerPosition();
      if (!pos) return;

      let cx = Math.floor(pos.x / cellSize);
      let cy = Math.floor(pos.y / cellSize);

      if (cx < 0 || cy < 0 || cx >= gridWidth || cy >= gridHeight) {
        clear();
      } else {
        const { x: sx, y: sy } = clientToServerCoords(cx, cy, gridHeight);

        setSelected({ x: sx, y: sy });
      }
      e.evt.preventDefault();
      e.cancelBubble = true;
    },
    [gridWidth, gridHeight, cellSize, setSelected, clear],
  );

  const { stageW, stageH } = stageSize(gridWidth, gridHeight, cellSize);

  return (
    <Stage width={stageW} height={stageH}>
      <SolvedCellsLayer
        gridWidth={gridWidth}
        gridHeight={gridHeight}
        cellSize={cellSize}
        solvedCoords={solvedCoords}
      />
      <Layer>
        <Group scale={{ x: cellSize, y: cellSize }}>
          <Rect
            width={gridWidth}
            height={gridHeight}
            fill={'rgba(0,0,0,0.001)'}
            onPointerDown={handlePick}
          />
          {selectedClient && (
            <Rect
              x={selectedClient.x}
              y={selectedClient.y}
              width={1}
              height={1}
              fill={'#141412'}
              strokeScaleEnabled={false}
              listening={false}
            />
          )}
        </Group>
      </Layer>
      <GridOverlayLayer
        gridWidth={gridWidth}
        gridHeight={gridHeight}
        cellSize={cellSize}
        visible={showGrid}
      />
    </Stage>
  );
};

export default PixelGridInteractive;
