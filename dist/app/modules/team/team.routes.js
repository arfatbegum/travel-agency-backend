"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const team_controller_1 = require("./team.controller");
const team_validation_1 = require("./team.validation");
const router = express_1.default.Router();
router.get('/', team_controller_1.TeamController.getAllTeams);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), team_controller_1.TeamController.getSingleTeam);
router.post("/", (0, validateRequest_1.default)(team_validation_1.TeamValidation.createTeamZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), team_controller_1.TeamController.createTeam);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(team_validation_1.TeamValidation.updateTeamZodSchema), team_controller_1.TeamController.updateTeam);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), team_controller_1.TeamController.deleteTeam);
exports.TeamRoutes = router;
