// src/domain/routes/UserRoutes.ts
import { Router } from 'express';
import { authenticateJWT } from '../../shared/middleware/authMiddleware';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { UserService } from '../../application/services/userService';
import { UserController } from '../controllers/userController';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const userRoutes = Router();

userRoutes.post('/admin/:id', authenticateJWT, asyncHandler(userController.createUser.bind(userController)));
userRoutes.put('/:id', authenticateJWT, asyncHandler(userController.editUser.bind(userController)));
userRoutes.put('/:id/activate', authenticateJWT, asyncHandler(userController.activedUser.bind(userController)));
userRoutes.delete('/:id/deactivate', authenticateJWT, asyncHandler(userController.deactivateUser.bind(userController)));
userRoutes.get('/', authenticateJWT, (req, res) => { userController.getAll(res); });
userRoutes.get('/:id', authenticateJWT, asyncHandler(userController.getById.bind(userController)));


export { userRoutes };
