/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { TeamMember, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { ITeamFilterRequest } from './team.interface';
import { teamFieldSearchableFields } from './team.constant';

const createTeam = async (data: TeamMember): Promise<TeamMember> => {
  const result = await prisma.teamMember.create({
    data: data,
  });
  return result;
};

const getAllTeams = async (
  filters: ITeamFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<TeamMember[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditons = [];

  if (searchTerm) {
    andConditons.push({
      OR: teamFieldSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditons.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditons: Prisma.TeamMemberWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {};

  const result = await prisma.teamMember.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.teamMember.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleTeam = async (id: string): Promise<TeamMember | null> => {
  const result = await prisma.teamMember.findUnique({
    where: { id },
  });
  return result;
};

const updateTeam = async (
  id: string,
  payload: Partial<TeamMember>
): Promise<TeamMember | null> => {
  const result = await prisma.teamMember.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteTeam = async (id: string): Promise<TeamMember | null> => {
  const result = await prisma.teamMember.delete({
    where: {
      id,
    },
  });
  return result;
};

export const TeamService = {
  createTeam,
  getAllTeams,
  getSingleTeam,
  updateTeam,
  deleteTeam,
};
