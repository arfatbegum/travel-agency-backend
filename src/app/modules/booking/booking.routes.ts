import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookingController } from './booking.controller';
import { BookingValidation } from './booking.validation';

const router = express.Router();

router.post(
  '/create-booking',
  validateRequest(BookingValidation.createBookingZodSchema),
  auth(ENUM_USER_ROLE.USER),
  BookingController.createBooking
);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), BookingController.getAllBooking);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  BookingController.getSingleBooking
);
router.patch(
  '/:id',
  validateRequest(BookingValidation.updateBookingZodSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  BookingController.updateBooking
);
router.patch(
  '/cancel-booking/:id',
  validateRequest(BookingValidation.updateBookingZodSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  BookingController.cancelBooking
);
router.patch(
  '/confirm-booking/:id',
  validateRequest(BookingValidation.updateBookingZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  BookingController.confirmBooking
);
router.patch(
  '/complete-booking/:id',
  validateRequest(BookingValidation.updateBookingZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  BookingController.completedBooking
);
router.delete('/', auth(ENUM_USER_ROLE.ADMIN), BookingController.deleteBooking);

export const BookingRoutes = router;
