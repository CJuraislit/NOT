import { Router } from 'express';
import { login, registration } from '../controllers/authController';

const router = Router();

router.post('/registration', registration);
router.post('/login', login);
router.get('/check', router);

export default router;
