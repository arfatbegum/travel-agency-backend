import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ContactService } from './contact.service';
import { contactFilterableFields } from './contact.constant';

const createContact = catchAsync(async (req: Request, res: Response) => {
  const { ...contactData } = req.body;
  const result = await ContactService.createContact(contactData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Contact created successfully!',
    data: result,
  });
});

const getAllContact = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, contactFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await ContactService.getAllContact(filters, options);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Categories retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleContact = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ContactService.getSingleContact(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Contact getched successfully',
    data: result,
  });
});

const updateContact = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await ContactService.updateContact(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Contact updated successfully !',
    data: result,
  });
});

const deleteContact = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ContactService.deleteContact(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Contact deleted successfully',
    data: result,
  });
});

export const ContactController = {
  createContact,
  getAllContact,
  getSingleContact,
  updateContact,
  deleteContact,
};
