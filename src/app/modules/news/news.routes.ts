import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { NewsController } from './news.controller';
import { NewsValidation } from './news.validation';

const router = express.Router();

router.get('/', NewsController.getAllNews);

router.get('/:id', NewsController.getSingleNews);

router.post(
  '/',
  validateRequest(NewsValidation.createNewsZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  NewsController.createNews
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(NewsValidation.updateNewsZodSchema),
  NewsController.updateNews
);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), NewsController.deleteNews);

export const NewsRoutes = router;
