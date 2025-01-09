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
exports.BookingServices = void 0;
const paypal_rest_sdk_1 = __importDefault(require("paypal-rest-sdk"));
const config_1 = __importDefault(require("../../../config"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const refundPayPalPayment_1 = require("../../middlewares/refundPayPalPayment");
const booking_constant_1 = require("./booking.constant");
// Configure PayPal SDK with your sandbox (test) credentials
paypal_rest_sdk_1.default.configure({
    mode: config_1.default.paypal.mode,
    client_id: config_1.default.paypal.client_id,
    client_secret: config_1.default.paypal.client_secret,
});
const createBooking = (userId, packageId, date, adult, details) => __awaiter(void 0, void 0, void 0, function* () {
    const { paymentMethod, paypalEmail, paymentStatus, paypalPayerId, paypalTransactionId, } = details;
    const tourPackage = yield prisma_1.default.package.findUnique({
        where: {
            id: packageId,
        },
    });
    if (!tourPackage) {
        throw new Error('This package is not available');
    }
    if (tourPackage.availableQunatity === 0) {
        throw new Error('This package is fully booked');
    }
    const paymentAmount = tourPackage.price.toFixed(2).toString();
    // Create a PaymentInfo record
    const paymentInfo = yield prisma_1.default.paymentInfo.create({
        data: {
            paymentMethod,
            paypalEmail,
            paymentStatus,
            paypalPayerId,
            paypalTransactionId,
        },
    });
    // Retrieve the paymentInfoId
    const paymentInfoId = paymentInfo.id;
    console.log(paymentInfoId);
    // Define the PayPal payment creation JSON
    const createPaymentJson = {
        intent: 'sale',
        payer: {
            payment_method: 'paypal',
        },
        redirect_urls: {
            return_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        },
        transactions: [
            {
                amount: {
                    total: paymentAmount,
                    currency: 'USD',
                },
                description: 'Your order description here',
            },
        ],
    };
    // Create a PayPal payment
    const paymentResponse = yield new Promise((resolve, reject) => {
        paypal_rest_sdk_1.default.payment.create(createPaymentJson, (error, payment) => {
            if (error) {
                reject(new Error('Error processing payment'));
            }
            else {
                resolve(payment);
            }
        });
    });
    if (!paymentResponse.links) {
        throw new Error('PayPal links are missing in the response');
    }
    // Save the PayPal payment ID and payment information to the Booking record
    const booking = yield prisma_1.default.booking.create({
        data: {
            date,
            adult,
            userId,
            packageId,
            status: 'processing',
            paymentInfoId: paymentInfoId,
        },
        include: {
            user: true,
            package: true,
            paymentInfo: true,
        },
    });
    // Update package availability
    yield prisma_1.default.package.update({
        where: {
            id: packageId,
        },
        data: {
            availableQunatity: tourPackage.availableQunatity - 1,
            isBooked: tourPackage.availableQunatity - 1 === 0,
        },
    });
    // Redirect the user to PayPal's approval URL
    for (let i = 0; i < paymentResponse.links.length; i++) {
        if (paymentResponse.links[i].rel === 'approval_url') {
            return {
                approvalUrl: paymentResponse.links[i].href,
                booking,
            };
        }
    }
    // Return the booking and payment information
    return {
        booking,
        paymentResponse,
    };
});
const getAllBooking = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: booking_constant_1.bookingFieldSearchableFields.map(field => ({
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
                if (booking_constant_1.bookingRelationalFields.includes(key)) {
                    return {
                        [booking_constant_1.bookingRelationalFieldsMapper[key]]: {
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
    const result = yield prisma_1.default.booking.findMany({
        include: {
            user: true,
            package: true,
            paymentInfo: true,
        },
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.booking.count({
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
});
const getSingleBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.findUnique({
        where: {
            id: id,
        },
        include: {
            user: true,
            package: true,
        },
    });
    return result;
});
const updateBooking = (id, booking) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.update({
        where: {
            id: id,
        },
        data: booking,
    });
    return result;
});
const deleteBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.delete({
        where: {
            id: id,
        },
    });
    return result;
});
const cancelBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    const booking = yield prisma_1.default.booking.findUnique({
        where: {
            id: id,
        },
    });
    if (!booking) {
        throw new Error('Booking does not exist');
    }
    if (booking.status === 'cancelled') {
        throw new Error('Booking has already been cancelled');
    }
    if (booking.status === 'Completed') {
        throw new Error('Booking has already been completed');
    }
    const cancelledBooking = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const bookingToCancel = yield transactionClient.booking.update({
            where: {
                id: id,
            },
            data: {
                status: 'cancelled',
            },
        });
        const availablePackage = yield transactionClient.package.findUnique({
            where: {
                id: booking.packageId,
            },
        });
        yield transactionClient.package.update({
            where: {
                id: booking.packageId,
            },
            data: {
                availableQunatity: {
                    increment: 1,
                },
                isBooked: availablePackage && availablePackage.availableQunatity + 1 > 0
                    ? false
                    : true,
            },
        });
        // Initiate the PayPal refund
        yield (0, refundPayPalPayment_1.refundPayPalPayment)(booking.paymentInfoId, booking.packageId);
        return {
            booking: bookingToCancel,
        };
    }));
    return cancelledBooking;
});
const confirmBooking = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield prisma_1.default.booking.findUnique({
        where: {
            id: bookingId,
        },
    });
    if (!booking) {
        throw new Error('Booking does not exist');
    }
    if (booking.status === 'cancelled') {
        throw new Error('Booking has cancelled');
    }
    if (booking.status === 'confirmed') {
        throw new Error('Booking has already been confirmed');
    }
    if (booking.status === 'Completed') {
        throw new Error('Booking has already been completed');
    }
    const confirmedBooking = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const bookingToConfirm = yield transactionClient.booking.update({
            where: {
                id: bookingId,
            },
            data: {
                status: 'confirmed',
            },
        });
        return {
            booking: bookingToConfirm,
        };
    }));
    return confirmedBooking;
});
const completedBooking = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield prisma_1.default.booking.findUnique({
        where: {
            id: bookingId,
        },
    });
    if (!booking) {
        throw new Error('Booking does not exist');
    }
    if (booking.status === 'cancelled') {
        throw new Error('Booking has cancelled');
    }
    if (booking.status === 'confirmed') {
        throw new Error('Booking been confirmed');
    }
    if (booking.status === 'Completed') {
        throw new Error('Booking has already been completed');
    }
    const completedBooking = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const bookingToConfirm = yield transactionClient.booking.update({
            where: {
                id: bookingId,
            },
            data: {
                status: 'completed',
            },
        });
        return {
            booking: bookingToConfirm,
        };
    }));
    return completedBooking;
});
exports.BookingServices = {
    createBooking,
    getAllBooking,
    getSingleBooking,
    updateBooking,
    deleteBooking,
    cancelBooking,
    confirmBooking,
    completedBooking,
};
