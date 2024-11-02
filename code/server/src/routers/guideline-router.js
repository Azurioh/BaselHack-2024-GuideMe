import express from 'express';
import { GuidelineRepository } from '../repositories/guideline-repository.js';
import { GuidelineService } from '../services/guideline-service.js';
import { GuidelineController } from '../controllers/guideline-controller.js';

const guidelineRouter = express.Router();

const guidelineRepository = new GuidelineRepository();
const guidelineService = new GuidelineService(guidelineRepository);
const guidelineController = new GuidelineController(guidelineService);

guidelineRouter.get('/', guidelineController.getAllGuidelines);
guidelineRouter.get('/:id', guidelineController.getGuidelineById);
guidelineRouter.post('/', guidelineController.createGuideline);
guidelineRouter.put('/:id', guidelineController.updateGuideline);
guidelineRouter.delete('/:id', guidelineController.deleteGuideline);

export default guidelineRouter;
