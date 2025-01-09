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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refundPayPalPayment = void 0;
const paypal_rest_sdk_1 = __importDefault(require("paypal-rest-sdk"));
const prisma_1 = __importDefault(require("../../shared/prisma"));
const refundPayPalPayment = (paymentId, packageId) => __awaiter(void 0, void 0, void 0, function* () {
    const tourPackage = yield prisma_1.default.package.findUnique({
        where: {
            id: packageId,
        },
    });
    if (!tourPackage) {
        throw new Error('This Package is not available');
    }
    const paymentAmount = tourPackage.price.toFixed(2).toString();
    const refundRequest = {
        amount: {
            total: paymentAmount,
            currency: 'USD',
        },
    };
    paypal_rest_sdk_1.default.sale.refund(paymentId, refundRequest, (error) => {
        if (error) {
            console.error('Error refunding PayPal payment:', error);
            throw new Error('Error refunding PayPal payment');
        }
        else {
            // Handle the successful refund
        }
    });
});
exports.refundPayPalPayment = refundPayPalPayment;
