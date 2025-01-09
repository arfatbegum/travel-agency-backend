"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRelationalFieldsMapper = exports.adminRelationalFields = exports.adminFieldSearchableFields = exports.adminFilterableFields = void 0;
exports.adminFilterableFields = ['searchTerm', 'bookingId'];
exports.adminFieldSearchableFields = [
    'name', 'email', 'contactNo',
];
exports.adminRelationalFields = ['bookingId'];
exports.adminRelationalFieldsMapper = {
    bookingId: 'bookings',
};
