import { NextFunction, Request, Response } from 'express';

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) return res.status(403).json({ message: 'Invalid id' });
  next();
};
