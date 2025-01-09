"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packageRelationalFieldsMapper = exports.packageRelationalFields = exports.packageFieldSearchableFields = exports.packageFilterableFields = void 0;
exports.packageFilterableFields = [
    'searchTerm'
];
exports.packageFieldSearchableFields = ['name', 'location'];
exports.packageRelationalFields = ['categoryId'];
exports.packageRelationalFieldsMapper = {
    categoryId: 'category',
};
