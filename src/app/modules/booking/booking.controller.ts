import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { bookingFilterableFields } from './booking.constant';
import { BookingServices } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  const { userId, serviceId, date } = req.body;
  const result = await BookingServices.createBooking(userId, serviceId, date);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

const getAllBooking = catchAsync(async (req, res) => {
  const filters = pick(req.query, bookingFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await BookingServices.getAllBooking(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Bookings fetched successfully',
    data: result,
  });
});

const getSingleBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.getSingleBooking(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking fetched successfully',
    data: result,
  });
});

const updateBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { ...bookingData } = req.body;
  const result = await BookingServices.updateBooking(id, bookingData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking updated successfully',
    data: result,
  });
});

const deleteBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.deleteBooking(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking deleted successfully',
    data: result,
  });
});

const cancelBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.cancelBooking(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking Cancelled successfully',
    data: result,
  });
});

const confirmBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.confirmBooking(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking confirmed successfully',
    data: result,
  });
});

const completedBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.completedBooking(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking confirmed successfully',
    data: result,
  });
});

export const BookingController = {
  createBooking,
  getAllBooking,
  getSingleBooking,
  updateBooking,
  deleteBooking,
  cancelBooking,
  confirmBooking,
  completedBooking
};
