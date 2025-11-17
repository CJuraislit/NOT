import { Router } from 'express';
import {
  createTemplate,
  publishTemplate,
  unpublishTemplate,
  updateTemplate,
} from '../controllers/adminTemplateController';
import { authMiddleware } from '../middleware/authMiddleware';
import { checkRole } from '../middleware/checkRoleMiddleware';
import { AuthRequest } from '../types/AuthRequest';

const router = Router();

router.post('/', authMiddleware, checkRole('ADMIN'), (req, res, next) =>
  createTemplate(req as AuthRequest, res, next),
);
router.patch('/:id', authMiddleware, checkRole('ADMIN'), (req, res, next) =>
  updateTemplate(req as AuthRequest, res, next),
);
router.patch('/:id/publish', authMiddleware, checkRole('ADMIN'), (req, res, next) =>
  publishTemplate(req as AuthRequest, res, next),
);
router.patch('/:id/unpublish', authMiddleware, checkRole('ADMIN'), (req, res, next) =>
  unpublishTemplate(req as AuthRequest, res, next),
);

export default router;
