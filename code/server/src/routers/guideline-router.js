import express from 'express';
import { GuidelineRepository } from '../repositories/guideline-repository.js';
import { GuidelineService } from '../services/guideline-service.js';
import { GuidelineController } from '../controllers/guideline-controller.js';
import authorizerValidator from '../middlewares/authorizer-validator.js';
import requestValidator from '../middlewares/request-validator.js';
import { createGuidelineSchema, markdownToPdfSchema, updateGuidelineSchema } from '../entities/guideline/guideline.js';

const guidelineRouter = express.Router();

const guidelineRepository = new GuidelineRepository();
const guidelineService = new GuidelineService(guidelineRepository);
const guidelineController = new GuidelineController(guidelineService);

guidelineRouter.get('/', authorizerValidator(), guidelineController.getAllGuidelines);
guidelineRouter.get('/:id', authorizerValidator(), guidelineController.getGuidelineById);
guidelineRouter.post(
  '/',
  authorizerValidator(),
  requestValidator(createGuidelineSchema),
  guidelineController.createGuideline,
);
guidelineRouter.put(
  '/:id',
  authorizerValidator(),
  requestValidator(updateGuidelineSchema),
  guidelineController.updateGuideline,
);
guidelineRouter.delete('/:id', authorizerValidator(), guidelineController.deleteGuideline);

guidelineRouter.post(
  '/markdownToPdf',
  authorizerValidator(),
  requestValidator(markdownToPdfSchema),
  guidelineController.generateFileFromMarkdown,
);

export default guidelineRouter;
