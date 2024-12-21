"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: "name is required" }),
    email: zod_1.z.string({ required_error: "email is required" }),
    password: zod_1.z.string({ required_error: "password is required" }),
    role: zod_1.z.string().optional(),
});
const updateUserValidationSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    password: zod_1.z.string().optional(),
    role: zod_1.z.string().optional(),
});
exports.userValidation = {
    createUserValidationSchema,
    updateUserValidationSchema,
};
