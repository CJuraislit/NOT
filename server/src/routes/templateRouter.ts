import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { attempt, getAllWithProgress, getOneWithProgress } from '../controllers/templateController';
import { AuthRequest } from '../types/AuthRequest';

const router = Router();

router.get('/', authMiddleware, (req, res, next) =>
  getAllWithProgress(req as AuthRequest, res, next),
);
router.get('/:id', authMiddleware, (req, res, next) =>
  getOneWithProgress(req as AuthRequest, res, next),
);
router.post('/:id/attempts', authMiddleware, (req, res, next) =>
  attempt(req as AuthRequest, res, next),
);

export default router;
