"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const handleValidationError_1 = require("../errorHandles/handleValidationError");
const appError_1 = require("./appError");
const handleZodError_1 = __importDefault(require("../errorHandles/handleZodError"));
const globalErrorHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = "Something went wrong";
    let errorSources = [
        { message: "Something went wrong", path: "" },
    ];
    if (error.name === "ZodError") {
        const simplifiedError = (0, handleZodError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    else if (error.name === "ValidationError") {
        const simplifiedError = (0, handleValidationError_1.handleValidationError)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    else if (error instanceof appError_1.AppError) {
        message = error === null || error === void 0 ? void 0 : error.message;
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        errorSources = [
            {
                path: "",
                message: error === null || error === void 0 ? void 0 : error.message,
            },
        ];
    }
    res.status(statusCode).json({
        success: false,
        message: error.name,
        statusCode,
        errorSources,
        stack: (error === null || error === void 0 ? void 0 : error.stack) || null,
    });
};
exports.globalErrorHandler = globalErrorHandler;
