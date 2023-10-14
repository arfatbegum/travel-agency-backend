import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidation } from './admin.validations';
import { AdminController } from './admin.controller';

const router = express.Router();

router.post(
  "/create-admin",
  validateRequest(AdminValidation.createAdminZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.createAdmin
);


router.get(
    '/profile',
    auth(ENUM_USER_ROLE.ADMIN),
    AdminController.getMyProfile
);

router.patch(
  '/profile',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(AdminValidation.updateAdminZodSchema),
  AdminController.updateMyProfile
);
  
router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.getAllAdmins
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.getSingleAdmin
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(AdminValidation.updateAdminZodSchema),
  AdminController.updateAdmin
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.deleteAdmin
);

export const AdminRoutes = router;
