import express from 'express';
import { UserRepository } from '../repositories/user-repository.js';
import { UserService } from '../services/user-service.js';
import { AuthController } from '../controllers/auth-controller.js';

const authRouter = express.Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const authController = new AuthController(userService);

authRouter.post('/login', authController.loginUser);
authRouter.post('/register', authController.registerUser);

export default authRouter;
