import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { TeamController } from './team.controller';
import { TeamValidation } from './team.validation';

const router = express.Router();

router.get(
  '/',
  TeamController.getAllTeams
);

router.get(
  '/:id',
  TeamController.getSingleTeam
);

router.post(
  "/",
  validateRequest(TeamValidation.createTeamZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  TeamController.createTeam
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(TeamValidation.updateTeamZodSchema),
  TeamController.updateTeam
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  TeamController.deleteTeam
);

export const TeamRoutes = router;
