import express from 'express';
import { UserRepository } from '../repositories/user-repository.js';
import { UserService } from '../services/user-service.js';
import { UserController } from '../controllers/user-controller.js';

const userRouter = express.Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.post('/login', userController.authenticateUser);
userRouter.post('/register', userController.createUser);

export default userRouter;