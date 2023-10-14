import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { serviceController } from './service.controller';
import { ServiceValidation } from './service.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(ServiceValidation.createServiceZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  serviceController.createService
);

router.get('/', serviceController.getAllServices);

router.get('/:id', serviceController.getSingleService);

router.patch(
  '/:id',
  validateRequest(ServiceValidation.updateServiceZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  serviceController.updateService
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  serviceController.deleteService
);

export const ServiceRoutes = router;
