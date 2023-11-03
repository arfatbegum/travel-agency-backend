/* eslint-disable @typescript-eslint/no-explicit-any */
import { Package, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  packageFieldSearchableFields,
  packageRelationalFields,
  packageRelationalFieldsMapper,
} from './package.constant';
import { IPackageFilterRequest } from './package.interface';

const createPackage = async (data: Package): Promise<Package> => {
  const result = await prisma.package.create({
    data,
    include: {
      categorires: true,
    },
  });
  return result;
};

const getAllPackages = async (
  filters: IPackageFilterRequest,
  options: IPaginationOptions
): Promise<Package[] | any> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: packageFieldSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (packageRelationalFields.includes(key)) {
          return {
            [packageRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.PackageWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.package.findMany({
    include: {
      reviews: true,
      categorires: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.package.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSinglePackage = async (id: string): Promise<Package | null> => {
  const result = await prisma.package.findUnique({
    where: {
      id: id,
    },
    include: {
      reviews: {
        include: {
          user: true,
        },
      },
      categorires: true,
    },
  });
  return result;
};

const updatePackage = async (
  id: string,
  tourPackage: Package
): Promise<Package> => {
  const result = await prisma.package.update({
    where: {
      id: id,
    },
    data: tourPackage,
  });
  return result;
};

const deletePackage = async (id: string): Promise<Package> => {
  const result = await prisma.package.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const PackageServices = {
  createPackage,
  getAllPackages,
  getSinglePackage,
  updatePackage,
  deletePackage,
};
