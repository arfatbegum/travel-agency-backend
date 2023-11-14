import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FeedbackController } from './feedback.controller';
import { FeedbackValidation } from './feedback.validation';

const router = express.Router();

router.get('/', FeedbackController.getAllFeedback);

router.get(
  '/:id',
  FeedbackController.getSingleFeedback
);

router.post(
  '/',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(FeedbackValidation.createFeedbackZodSchema),
  FeedbackController.createFeedback
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(FeedbackValidation.updateFeedbackZodSchema),
  FeedbackController.updateFeedback
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.USER),
  FeedbackController.deleteFeedback
);

export const FeedbackRoutes = router;
