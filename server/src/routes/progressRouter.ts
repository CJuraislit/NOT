import { Router } from 'express';

const router = Router();

router.get('templates/:id/progress', router);
router.post('templates/:id/attempt', router);

export default router;
