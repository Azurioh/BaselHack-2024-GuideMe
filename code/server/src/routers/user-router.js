import express from 'express';
import { UserRepository } from '../repositories/user-repository.js';
import { UserService } from '../services/user-service.js';
import { UserController } from '../controllers/user-controller.js';

const userRouter = express.Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.get('/:email', userController.getUserByEmail);
userRouter.post('/', userController.createUser);
// router.put('/:id');
// router.delete('/:id');

export default userRouter;