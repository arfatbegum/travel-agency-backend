import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FaqController } from './faq.controller';
import { FaqValidation } from './faq.validations';

const router = express.Router();

router.get('/', FaqController.getAllFaq);

router.get('/:id', FaqController.getSingleFaq);

router.post(
  '/',
  validateRequest(FaqValidation.createFaqZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  FaqController.createFaq
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(FaqValidation.updateFaqZodSchema),
  FaqController.updateFaq
);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), FaqController.deleteFaq);

export const FaqRoutes = router;
