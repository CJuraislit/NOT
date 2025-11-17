import { Router } from 'express';
import authRouter from './authRouter';
import userRouter from './userRouter';
import templateRouter from './templateRouter';
import progressRouter from './progressRouter';
import adminTemplateRouter from './adminTemplateRouter';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/templates', templateRouter);
router.use('/progress', progressRouter);
router.use('/admin/templates', adminTemplateRouter);

export default router;
