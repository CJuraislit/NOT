import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/ApiError';
import type { Roles } from '../types/user';

export function checkRole(role: Roles) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.user) return next(ApiError.badRequest('Unauthorized'));
    if (req.user.role !== role) return next(ApiError.badRequest('No access'));
    next();
  };
}
