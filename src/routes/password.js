import { Router } from 'express';
import { requestPasswordReset, resetPassword } from '../controllers/passwordController.js';

const router = Router();

router.post('/forgot', requestPasswordReset);
router.post('/reset/:token', resetPassword);

export default router;
