"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRelationalFieldsMapper = exports.bookingRelationalFields = exports.bookingFieldSearchableFields = exports.bookingFilterableFields = void 0;
exports.bookingFilterableFields = [
    'searchTerm',
    'id',
    'userId',
    'packageId',
];
exports.bookingFieldSearchableFields = [
    'name', 'status', 'date', 'user', 'package',
];
exports.bookingRelationalFields = ['userId', 'packageId'];
exports.bookingRelationalFieldsMapper = {
    userId: 'user',
    serviceId: 'package',
};
