import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewController } from './review.controller';
import { ReviewValidation } from './review.validation';

const router = express.Router();

router.get('/', ReviewController.getAllReviews);

router.get('/:id', ReviewController.getSingleReview);

router.post(
  '/',
  validateRequest(ReviewValidation.createReviewZodSchema),
  auth(ENUM_USER_ROLE.USER),
  ReviewController.addReview
);

router.patch('/:id', auth(ENUM_USER_ROLE.USER), ReviewController.updateReview);
router.delete('/:id', auth(ENUM_USER_ROLE.USER), ReviewController.deleteReview);

export const ReviewRoutes = router;
