import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { faqFilterableFields } from './faq.constant';
import { FaqService } from './faq.service';

const createFaq = catchAsync(async (req: Request, res: Response) => {
  const { ...faqData } = req.body;
  const result = await FaqService.createFaq(faqData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Faq created successfully!',
    data: result,
  });
});

const getAllFaq = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, faqFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await FaqService.getAllFaq(filters, options);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Faqs retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFaq = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FaqService.getSingleFaq(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Faq getched successfully',
    data: result,
  });
});

const updateFaq = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await FaqService.updateFaq(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faq updated successfully !',
    data: result,
  });
});

const deleteFaq = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FaqService.deleteFaq(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Faq deleted successfully',
    data: result,
  });
});

export const FaqController = {
  createFaq,
  getAllFaq,
  getSingleFaq,
  updateFaq,
  deleteFaq,
};
