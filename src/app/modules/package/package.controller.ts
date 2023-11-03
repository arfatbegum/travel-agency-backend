import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { PackageServices } from './package.service';
import { packageFilterableFields } from './package.constant';

const createPackage = catchAsync(async (req: Request, res: Response) => {
  const result = await PackageServices.createPackage(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Package created successfully',
    data: result,
  });
});

const getAllPackages = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, packageFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await PackageServices.getAllPackages(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Package fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSinglePackage = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PackageServices.getSinglePackage(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Package fetched successfully',
    data: result,
  });
});

const updatePackage = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PackageServices.updatePackage(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Package updated successfully',
    data: result,
  });
});

const deletePackage = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PackageServices.deletePackage(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Package delete successfully',
    data: result,
  });
});

export const PackageController = {
  createPackage,
  getAllPackages,
  getSinglePackage,
  updatePackage,
  deletePackage,
};
