import { CoordTuple } from '/types/api/templateAPI';

export type PixelGridInteractiveProps = {
  gridWidth: number;
  gridHeight: number;
  cellSize?: number;
  showGrid: boolean;

  solvedCoords: Readonly<CoordTuple[]>;
  solvedCount: number;
  isCompleted: boolean;
};
