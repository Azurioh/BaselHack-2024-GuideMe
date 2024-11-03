import express from 'express';
import { UserRepository } from '../repositories/user-repository.js';
import { UserService } from '../services/user-service.js';
import { UserController } from '../controllers/user-controller.js';
import authorizerValidator from '../middlewares/authorizer-validator.js';
import requestValidator from '../middlewares/request-validator.js';
import { updateUserSchema } from '../entities/user/user.js';

const userRouter = express.Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.get('/me', authorizerValidator(), userController.getUserMe);
userRouter.put('/me', authorizerValidator(), requestValidator(updateUserSchema), userController.updateUserMe);
// userRouter.put('/:id', userController.updateUser);

userRouter.post('/like/:guidelineId', authorizerValidator(), userController.likeGuideline);
userRouter.delete('/like/:guidelineId', authorizerValidator(), userController.unlikeGuideline);
userRouter.post('/save/:guidelineId', authorizerValidator(), userController.saveGuideline);
userRouter.delete('/save/:guidelineId', authorizerValidator(), userController.unsaveGuideline);

export default userRouter;
