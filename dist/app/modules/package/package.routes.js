"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const package_controller_1 = require("./package.controller");
const package_validation_1 = require("./package.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(package_validation_1.PackageValidation.createPackageZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), package_controller_1.PackageController.createPackage);
router.get('/', package_controller_1.PackageController.getAllPackages);
router.get('/:id', package_controller_1.PackageController.getSinglePackage);
router.patch('/:id', (0, validateRequest_1.default)(package_validation_1.PackageValidation.updatePackageZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), package_controller_1.PackageController.updatePackage);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), package_controller_1.PackageController.deletePackage);
exports.PackageRoutes = router;
