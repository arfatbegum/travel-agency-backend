import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';
import { paginationFields } from '../../../constants/pagination';
import { userFilterableFields } from './user.constant';
import pick from '../../../shared/pick';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await UserService.createUser(userData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User created successfully!',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await UserService.getAllUsers(filters, options);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getSingleUser(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User getched successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await UserService.updateUser(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully !',
    data: result,
  });
});

const deleteAUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.deleteAUser(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User deleted successfully',
    data: result,
  });
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const userRole = req.user?.role;

  const result = await UserService.getMyProfile(userId, userRole);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'My Profile retrieved successfully',
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const userRole = req.user?.role;
  const updatedData = req.body;

  const result = await UserService.updateMyProfile(
    userId,
    userRole,
    updatedData
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'My Profile retrieved successfully',
    data: result,
  });
});

const getMyBooking = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const result = await UserService.getMyBooking(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'My Booking retrieved successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteAUser,
  getMyProfile,
  updateMyProfile,
  getMyBooking,
};
