import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { SuperAdminController } from './superAdmin.controller';


const router = express.Router();

router.get(
    '/profile',
    auth(ENUM_USER_ROLE.SUPER_ADMIN),
    SuperAdminController.getMyProfile
);

router.patch(
  '/profile',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  SuperAdminController.updateMyProfile
);

export const SuperAdminRoutes = router;
