import { Request, Response, NextFunction } from 'express';
import { Referral, User, UserStats } from '../models';
import { AuthRequest } from '../types/AuthRequest';
import ApiError from '../error/ApiError';

export const getMyProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'email', 'username', 'rating', 'created_at', 'role'],
      // include: [{ model: UserStats, as: 'stats' }],
    });
    if (!user) {
      return next(ApiError.badRequest('User not found'));
    }

    return res.json(user);
  } catch (error) {
    if (error instanceof ApiError) {
      return next(ApiError.internal(error.message));
    }
    if (error instanceof Error) {
      return next(ApiError.internal(error.message));
    }
    return next(ApiError.badRequest('Unexpected error'));
  }
};

export const getMyStats = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const stats = await UserStats.findOne({ where: { user_id: req.user.id } });
    if (!stats) {
      return next(ApiError.badRequest('User not found'));
    }

    return res.json(stats);
  } catch (error) {
    if (error instanceof ApiError) {
      return next(ApiError.internal(error.message));
    }
    if (error instanceof Error) {
      return next(ApiError.internal(error.message));
    }
    return next(ApiError.badRequest('Unexpected error'));
  }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: ['id', 'username', 'rating', 'created_at'],
      include: [{ model: UserStats, as: 'stats' }],
    });
    if (!user) {
      return next(ApiError.badRequest('User not found'));
    }

    return res.json(user);
  } catch (error) {
    if (error instanceof ApiError) {
      return next(ApiError.internal(error.message));
    }
    if (error instanceof Error) {
      return next(ApiError.internal(error.message));
    }
    return next(ApiError.badRequest('Unexpected error'));
  }
};

export const getStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const stats = await UserStats.findOne({ where: { user_id: id } });

    return res.json(stats);
  } catch (error) {
    if (error instanceof ApiError) {
      return next(ApiError.internal(error.message));
    }
    if (error instanceof Error) {
      return next(ApiError.internal(error.message));
    }
    return next(ApiError.badRequest('Unexpected error'));
  }
};

export const getReferrals = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const referrerId = req.user.id;

    const referrals = await Referral.findAll({
      where: { referrer_id: referrerId },
      include: [
        {
          model: User,
          as: 'referred',
          attributes: ['id', 'username', 'rating', 'created_at'],
          include: [
            {
              model: UserStats,
              as: 'stats',
              attributes: ['completed_art_count', 'attempts_used_today', 'total_pixels_placed'],
            },
          ],
        },
      ],
      order: [[{ model: User, as: 'referred' }, 'rating', 'DESC']],
    });

    const result = referrals.map((referral) => ({
      id: referral.id,
      username: referral.referred!.username,
      rating: referral.referred!.rating,
      created_at: referral.referred!.created_at,
      stats: referral.referred!.stats,
    }));

    return res.json(result);
  } catch (error) {
    console.log('🔥 Referral error:', error);
    if (error instanceof ApiError) {
      return next(ApiError.internal(error.message));
    }
    if (error instanceof Error) {
      return next(ApiError.internal(error.message));
    }
    return next(ApiError.badRequest('Unexpected error'));
  }
};
