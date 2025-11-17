import { CoordTuple } from '/types/api/templateAPI';

export type SolvedCellLayerProps = {
  gridWidth: number;
  gridHeight: number;
  cellSize: number;
  solvedCoords: Readonly<CoordTuple[]>;
};
