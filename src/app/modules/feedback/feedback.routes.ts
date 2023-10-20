import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { FeedbackController } from './feedback.controller';

const router = express.Router();

router.get(
  '/',
  FeedbackController.getAllFeedback
);


router.post(
  "/",
  auth(ENUM_USER_ROLE.USER),
  FeedbackController.createFeedback
);

export const FeedbackRoutes = router;
