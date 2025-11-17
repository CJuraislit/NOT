import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import {
  getMyProfile,
  getMyStats,
  getProfile,
  getReferrals,
  getStats,
} from '../controllers/userController';
import { AuthRequest } from '../types/AuthRequest';
import { validateId } from '../middleware/validateParamsMiddleware';

const router = Router();

router.get('/me', authMiddleware, (req, res, next) => getMyProfile(req as AuthRequest, res, next));
router.get('/me/stats', authMiddleware, (req, res, next) =>
  getMyStats(req as AuthRequest, res, next),
);
router.get('/referrals', authMiddleware, (req, res, next) =>
  getReferrals(req as AuthRequest, res, next),
);
router.get('/:id', validateId, getProfile);
router.get('/:id/stats', validateId, getStats);

export default router;
