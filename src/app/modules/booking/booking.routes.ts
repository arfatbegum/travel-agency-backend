import express from 'express';
import { BookingController } from './booking.controller';

const router = express.Router();

router.post('/create-booking', BookingController.createBooking);
router.get('/', BookingController.getAllBooking);
router.get('/:id', BookingController.getSingleBooking);
router.patch('/:id', BookingController.updateBooking);
router.patch('/cancel-booking/:id', BookingController.cancelBooking);
router.patch('/confirm-booking/:id', BookingController.confirmBooking);
router.patch('/complete-booking/:id', BookingController.completedBooking);
router.delete('/', BookingController.deleteBooking);



export const BookingRoutes = router;