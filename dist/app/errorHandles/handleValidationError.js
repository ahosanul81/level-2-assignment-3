"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
const http_status_codes_1 = require("http-status-codes");
const handleValidationError = (error) => {
    const errorSources = Object.values(error.errors).map((value) => {
        return {
            message: value === null || value === void 0 ? void 0 : value.message,
            path: value === null || value === void 0 ? void 0 : value.path,
        };
    });
    const statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST || 400;
    return {
        success: false,
        statusCode,
        message: error.message,
        errorSources,
    };
};
exports.handleValidationError = handleValidationError;
