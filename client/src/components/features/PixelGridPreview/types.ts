import { CoordTuple } from '/types/api/templateAPI';

export type PixelGridPreviewProps = {
  gridWidth: number;
  gridHeight: number;
  cellSize?: number;

  solvedCoords: CoordTuple[];
  solvedCount: number;
  isCompleted: boolean;
};
