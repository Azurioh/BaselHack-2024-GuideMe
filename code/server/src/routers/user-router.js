import express from 'express';
import { UserRepository } from '../repositories/user-repository.js';
import { UserService } from '../services/user-service.js';
import { UserController } from '../controllers/user-controller.js';
import requestValidator from '../middlewares/request-validator.js';
import { createUserSchema } from '../entities/user/user.js';

const userRouter = express.Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.post('/', userController.createUser);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

userRouter.post('/:userId/like/:guidelineId', userController.likeGuideline);
userRouter.delete('/:userId/like/:guidelineId', userController.unlikeGuideline);
userRouter.post('/:userId/save/:guidelineId', userController.saveGuideline);
userRouter.delete('/:userId/save/:guidelineId', userController.unsaveGuideline);

export default userRouter;
