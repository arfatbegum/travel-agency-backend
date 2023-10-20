import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';;
import sendResponse from '../../../shared/sendResponse';
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
  const result = await FeedbackService.getAllFeedback();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Categories retrieved successfully',
    data: result,
  });
});


export const FeedbackController = {
    createFeedback,
    getAllFeedback,
};
