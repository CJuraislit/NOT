import { CoordTuple } from '/types/api/templateAPI';

export const serverToClientCoords = (sx: number, sy: number, gridHeight: number) => {
  return { x: sx - 1, y: gridHeight - sy };
};

export const clientToServerCoords = (cx: number, cy: number, gridHeight: number) => {
  return { x: cx + 1, y: gridHeight - cy };
};

export const coordsToBuffer = (
  solvedCoords: Readonly<CoordTuple[]>,
  gridHeight: number,
): Int32Array => {
  const out = new Int32Array(solvedCoords.length * 2);
  for (let i = 0; i < solvedCoords.length; i++) {
    const [sx, sy] = solvedCoords[i];
    const { x, y } = serverToClientCoords(sx, sy, gridHeight);
    out[i * 2] = x;
    out[i * 2 + 1] = y;
  }
  return out;
};
