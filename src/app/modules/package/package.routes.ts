import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { PackageController } from './package.controller';
import { PackageValidation } from './package.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(PackageValidation.createPackageZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  PackageController.createPackage
);

router.get('/', PackageController.getAllPackages);

router.get('/:id', PackageController.getSinglePackage);

router.patch(
  '/:id',
  validateRequest(PackageValidation.updatePackageZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  PackageController.updatePackage
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  PackageController.deletePackage
);

export const PackageRoutes = router;
