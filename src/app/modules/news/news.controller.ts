import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { newsFilterableFields } from './news.constant';
import { NewsService } from './news.service';

const createNews = catchAsync(async (req: Request, res: Response) => {
  const { ...newsData } = req.body;
  const result = await NewsService.createNews(newsData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'News created successfully!',
    data: result,
  });
});

const getAllNews = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, newsFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await NewsService.getAllNews(filters, options);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'News retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleNews = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await NewsService.getSingleNews(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'News fetched successfully',
    data: result,
  });
});

const updateNews = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await NewsService.updateNews(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'News updated successfully !',
    data: result,
  });
});

const deleteNews = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await NewsService.deleteNews(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'News deleted successfully',
    data: result,
  });
});

export const NewsController = {
  createNews,
  getAllNews,
  getSingleNews,
  updateNews,
  deleteNews,
};
