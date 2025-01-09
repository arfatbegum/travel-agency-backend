"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const faq_controller_1 = require("./faq.controller");
const faq_validations_1 = require("./faq.validations");
const router = express_1.default.Router();
router.get('/', faq_controller_1.FaqController.getAllFaq);
router.get('/:id', faq_controller_1.FaqController.getSingleFaq);
router.post('/', (0, validateRequest_1.default)(faq_validations_1.FaqValidation.createFaqZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), faq_controller_1.FaqController.createFaq);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(faq_validations_1.FaqValidation.updateFaqZodSchema), faq_controller_1.FaqController.updateFaq);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), faq_controller_1.FaqController.deleteFaq);
exports.FaqRoutes = router;
