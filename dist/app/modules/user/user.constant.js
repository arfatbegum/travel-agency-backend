"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRelationalFieldsMapper = exports.userRelationalFields = exports.userFieldSearchableFields = exports.userFilterableFields = void 0;
exports.userFilterableFields = [
    'searchTerm',
    'id',
    'createdAt',
];
exports.userFieldSearchableFields = [
    'name', 'email',
    'contactNo',
];
exports.userRelationalFields = ['userId', 'serviceId'];
exports.userRelationalFieldsMapper = {
    userId: 'user',
    serviceId: 'service',
};
