"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const validateRequest_1 = __importDefault(require("../../middleWares/validateRequest"));
const user_zod_validation_1 = require("../User/user.zod.validation");
const auth_1 = __importDefault(require("../../middleWares/auth"));
const user_constants_1 = require("../User/user.constants");
const adminRouter = express_1.default.Router();
adminRouter.patch("/users/:userId", (0, auth_1.default)(user_constants_1.UserRole.admin), (0, validateRequest_1.default)(user_zod_validation_1.userValidation.updateUserValidationSchema), admin_controller_1.adminControllers.updateUserStatus);
adminRouter.delete("/users/:userId", (0, auth_1.default)(user_constants_1.UserRole.admin), admin_controller_1.adminControllers.deleteUser);
exports.default = adminRouter;
