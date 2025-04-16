import { Router } from 'express';
import { UserController } from '../../infrastructure/delivery/user/UserController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();
const userController = new UserController();

// Public routes
router.post('/', userController.createUser.bind(userController));

// Protected routes (require authentication)
router.use(authenticate);

router.get('/:id', userController.getUserById.bind(userController));
router.post('/:userId/roles', userController.assignRole.bind(userController));
router.get('/role/:roleId', userController.getUsersByRole.bind(userController));

export default router;