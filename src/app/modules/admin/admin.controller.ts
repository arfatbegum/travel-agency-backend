import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { adminFilterableFields } from './admin.constant';
import { AdminService } from './admin.service';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await AdminService.createAdmin(userData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin created successfully!',
    data: result,
  });
});

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await AdminService.getAllAdmins(filters, options);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admins retrieved successfully',
    data: result,
  });
});

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.getSingleAdmin(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin fetched successfully',
    data: result,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await AdminService.updateAdmin(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin updated successfully !',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.deleteAdmin(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin deleted successfully',
    data: result,
  });
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const userRole = req.user?.role;

  const result = await AdminService.getMyProfile(userId, userRole);

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

  const result = await AdminService.updateMyProfile(
    userId,
    userRole,
    updatedData
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'My Profile Updated successfully',
    data: result,
  });
});

export const AdminController = {
  createAdmin,
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  getMyProfile,
  updateMyProfile
};
