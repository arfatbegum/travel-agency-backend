"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const news_controller_1 = require("./news.controller");
const news_validation_1 = require("./news.validation");
const router = express_1.default.Router();
router.get('/', news_controller_1.NewsController.getAllNews);
router.get('/:id', news_controller_1.NewsController.getSingleNews);
router.post('/', (0, validateRequest_1.default)(news_validation_1.NewsValidation.createNewsZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), news_controller_1.NewsController.createNews);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(news_validation_1.NewsValidation.updateNewsZodSchema), news_controller_1.NewsController.updateNews);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), news_controller_1.NewsController.deleteNews);
exports.NewsRoutes = router;
