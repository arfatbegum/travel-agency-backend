import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { TeamService } from './team.service';
import { teamFilterableFields } from './team.constant';

const createTeam = catchAsync(async (req: Request, res: Response) => {
  const { ...TeamData } = req.body;
  const result = await TeamService.createTeam(TeamData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Teams created successfully!',
    data: result,
  });
});

const getAllTeams = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, teamFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await TeamService.getAllTeams(filters, options);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Teams retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleTeam = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TeamService.getSingleTeam(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Team getched successfully',
    data: result,
  });
});

const updateTeam = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await TeamService.updateTeam(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Team updated successfully !',
    data: result,
  });
});

const deleteTeam = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TeamService.deleteTeam(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Team deleted successfully',
    data: result,
  });
});

export const TeamController = {
  createTeam,
  getAllTeams,
  getSingleTeam,
  updateTeam,
  deleteTeam,
};
