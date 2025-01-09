"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const user_constant_1 = require("./user.constant");
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, contactNo, address, profileImg } = data;
    if (!validator_1.default.isEmail(email)) {
        throw new Error('Invalid email address');
    }
    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS);
    if (isNaN(saltRounds) || saltRounds <= 0) {
        throw new Error('BCRYPT_SALT_ROUNDS is not properly configured.');
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
    const user = yield prisma_1.default.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role: 'user',
            contactNo,
            address,
            profileImg,
        },
    });
    return user;
});
const getAllUsers = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: user_constant_1.userFieldSearchableFields.map(field => ({
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
                if (user_constant_1.userFilterableFields.includes(key)) {
                    return {
                        [user_constant_1.userRelationalFieldsMapper[key]]: {
                            id: filterData[key],
                        },
                    };
                }
                else {
                    return {
                        [key]: {
                            equals: filterData[key],
                        },
                    };
                }
            }),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.user.findMany({
        include: {
            reviews: true,
            bookings: true,
        },
        where: {
            AND: [
                {
                    role: 'user',
                },
                whereConditions,
            ],
        },
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.user.count({
        where: {
            AND: [
                {
                    role: 'user',
                },
                whereConditions,
            ],
        },
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
        where: { id },
    });
    return result;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteAUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.delete({
        where: {
            id,
        },
    });
    return result;
});
const getMyProfile = (userId, userRole) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
        where: {
            id: userId,
            role: userRole,
        },
    });
    return result;
});
const updateMyProfile = (userId, userRole, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.update({
        where: {
            id: userId,
            role: userRole,
        },
        data: payload,
    });
    return result;
});
const getMyBooking = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.findMany({
        where: {
            userId: userId,
        },
        include: {
            package: true,
            user: true,
            paymentInfo: true,
        },
    });
    return result;
});
const getMyEnquiry = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.contact.findMany({
        where: {
            userId: userId,
        },
        include: {
            user: true,
        },
    });
    return result;
});
const getSingleEnquiry = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.contact.findUnique({
        where: { id },
        include: {
            user: true,
        },
    });
    return result;
});
const getMyFeedback = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.feedback.findMany({
        where: {
            userId: userId,
        },
        include: {
            user: true,
        },
    });
    return result;
});
exports.UserService = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteAUser,
    getMyProfile,
    updateMyProfile,
    getMyBooking,
    getMyEnquiry,
    getMyFeedback,
    getSingleEnquiry,
};