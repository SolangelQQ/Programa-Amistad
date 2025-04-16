import { Router } from 'express';
import { AuthController } from '../../infrastructure/delivery/user/AuthController';

const router = Router();
const authController = new AuthController();

router.post('/login', authController.login.bind(authController));
router.get('/me', authController.getCurrentUser.bind(authController));

export default router;