import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/ApiError';
import type { DecodedUser } from '../types/user';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.method === 'OPTIONS') next();

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return next(ApiError.forbidden('No token provided'));

    const token = authHeader.split(' ')[1];
    if (!token) return next(ApiError.unauthorized('Unauthorized'));

    const decoded = jwt.verify(token, String(process.env.JWT_SECRET)) as DecodedUser;
    req.user = decoded;
    next();
  } catch {
    return next(ApiError.unauthorized('Unauthorized'));
  }
}
