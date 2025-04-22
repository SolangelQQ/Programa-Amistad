// src/interfaces/http/role.routes.ts
import { Router } from 'express';
import { RoleController } from '../../infrastructure/delivery/user/RoleController';
import { authMiddleware } from '../middleware/authMiddleware';

const roleRoutes = Router();
const roleController = new RoleController();

// Apply auth middleware to all routes - still require users to be logged in
roleRoutes.use(authMiddleware);

// All role routes accessible to any authenticated user
roleRoutes.post('/', (req, res) => roleController.createRole(req, res));
roleRoutes.put('/:id', (req, res) => roleController.updateRole(req, res));
roleRoutes.delete('/:id', (req, res) => roleController.deleteRole(req, res));
roleRoutes.post('/assign', (req, res) => roleController.assignRole(req, res));
roleRoutes.get('/', (req, res) => roleController.getAllRoles(req, res));

roleRoutes.get('/user/:userId', (req, res) => roleController.getUserRoles(req, res));
roleRoutes.get('/:id', (req, res) => roleController.getRoleById(req, res));

export default roleRoutes;