import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { feedbackFilterableFields } from './feedback.constant';
import { FeedbackService } from './feedback.service';
const createFeedback = catchAsync(async (req: Request, res: Response) => {
  const { ...feedbackData } = req.body;
  const result = await FeedbackService.createFeedback(feedbackData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Feedback created successfully!',
    data: result,
  });
});

const getAllFeedback = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, feedbackFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await FeedbackService.getAllFeedback(filters, options);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Feedback retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFeedback = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FeedbackService.getSingleFeedback(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Feedback getched successfully',
    data: result,
  });
});

const updateFeedback = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await FeedbackService.updateFeedback(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback updated successfully !',
    data: result,
  });
});

const deleteFeedback = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FeedbackService.deleteFeedback(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Feedback deleted successfully',
    data: result,
  });
});

export const FeedbackController = {
  createFeedback,
  getAllFeedback,
  getSingleFeedback,
  updateFeedback,
  deleteFeedback,
};
