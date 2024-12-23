"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = require("../utils/appError");
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../modules/User/user.model");
const auth = (...roles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token) {
            throw new appError_1.AppError(http_status_codes_1.StatusCodes.FORBIDDEN, "You are not authorized");
        }
        // verify token
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        if (roles && !roles.includes(decoded.role)) {
            throw new appError_1.AppError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "You are not authorized ");
        }
        console.log(decoded);
        const { email, role, iat } = decoded;
        const user = yield user_model_1.UserModel.findOne({ email });
        if (!user) {
            throw new appError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
        }
        if (user.isBlocked === true) {
            throw new appError_1.AppError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "You are blocked");
        }
        next();
    }));
};
exports.default = auth;
