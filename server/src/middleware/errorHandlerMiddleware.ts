import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/ApiError';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, ...(err.meta && { meta: err.meta }) });
  }
  return res.status(500).json({ message: 'Server error occurred' });
}
