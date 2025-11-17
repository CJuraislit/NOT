export type CoordTuple = [number, number];

export type TemplateListItem = {
  id: number;
  name: string;
  totalCount: number;
  solvedCount: number;
  solvedCoords: CoordTuple[];
  isCompleted: boolean;
};

export type TemplateDetail = TemplateListItem & {
  description: string;
  width: number;
  height: number;
};

export type AttemptPixelPayload = {
  x: number;
  y: number;
};

export type AttemptPixelResponse = {
  correct: boolean;
  solvedCount: number;
  solvedCoords: CoordTuple[];
  isCompleted: boolean;
};
