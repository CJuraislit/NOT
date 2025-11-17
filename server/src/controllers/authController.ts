import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ApiError from '../error/ApiError';
import { User, UserStats } from '../models';
import { Op } from 'sequelize';

const generateJwt = (id: number, email: string, role: string) => {
  return jwt.sign({ id, email, role }, String(process.env.JWT_SECRET), {
    expiresIn: '24h',
  });
};

export const registration = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, username, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest('Wrong email or password', { field: 'email|password' }));
    }
    if (!username || !username.length) {
      return next(ApiError.badRequest('Enter correct username', { field: 'username' }));
    }

    const existingUser = await User.findOne({ where: { [Op.or]: [{ email }, { username }] } });

    if (existingUser) {
      const field = existingUser.email === email ? 'email' : 'username';
      return next(ApiError.badRequest(`User with this ${field} already exists`, { field }));
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, username, password_hash: hashPassword });
    const userStats = await UserStats.create({ user_id: user.id });
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  } catch (error) {
    if (error instanceof Error) {
      return next(ApiError.badRequest(error.message));
    }
    if (error instanceof Error) {
      return next(ApiError.internal(error.message));
    }
    return next(ApiError.badRequest('Unexpected error'));
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    const passwordHash = user?.password_hash ?? '';
    const comparePassword = await bcrypt.compare(password, passwordHash);

    if (!user || !comparePassword) {
      return next(ApiError.badRequest('Wrong email or password', { field: 'email|password' }));
    }

    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  } catch (error) {
    if (error instanceof Error) {
      return next(ApiError.badRequest(error.message));
    }
    if (error instanceof Error) {
      return next(ApiError.internal(error.message));
    }
    return next(ApiError.badRequest('Unexpected error'));
  }
};
