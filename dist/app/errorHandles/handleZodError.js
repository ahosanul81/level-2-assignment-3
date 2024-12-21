"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (error) => {
    const errorSources = error.issues.map((issue) => {
        return {
            message: issue === null || issue === void 0 ? void 0 : issue.message,
            path: "",
        };
    });
    const statusCode = 400;
    return {
        success: false,
        statusCode,
        message: "validation error",
        errorSources,
    };
};
exports.default = handleZodError;
