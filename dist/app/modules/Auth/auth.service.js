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
exports.authServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const appError_1 = require("../../utils/appError");
const user_model_1 = require("../User/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = payload;
        const isExistsUser = yield user_model_1.UserModel.findOne({ email });
        if (!isExistsUser) {
            throw new appError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "User not has not found");
        }
        //   check password
        if ((isExistsUser === null || isExistsUser === void 0 ? void 0 : isExistsUser.password) !== password) {
            throw new appError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Password is not correct");
        }
        //   generate token
        const jwtPayload = {
            email: email,
            role: isExistsUser === null || isExistsUser === void 0 ? void 0 : isExistsUser.role,
        };
        const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
            expiresIn: config_1.default.jwt_access_expires_in,
        });
        return {
            accessToken,
        };
    }
    catch (error) {
        throw new appError_1.AppError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Invalid credentials");
    }
});
exports.authServices = {
    loginUser,
};
