"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const superAdmin_controller_1 = require("./superAdmin.controller");
const router = express_1.default.Router();
router.get('/profile', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), superAdmin_controller_1.SuperAdminController.getMyProfile);
router.patch('/profile', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), superAdmin_controller_1.SuperAdminController.updateMyProfile);
exports.SuperAdminRoutes = router;
