"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogValidation = void 0;
const zod_1 = require("zod");
const createBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: "title is required" }),
        content: zod_1.z.string({ required_error: "content is required" }),
        author: zod_1.z.string({ required_error: "author is required" }),
        isPublished: zod_1.z.boolean(),
    }),
});
const updateBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: "title is required" }).optional(),
        content: zod_1.z.string({ required_error: "content is required" }).optional(),
        author: zod_1.z.string({ required_error: "author is required" }).optional(),
        isPublished: zod_1.z.boolean().optional(),
    }),
});
exports.blogValidation = {
    createBlogValidationSchema,
    updateBlogValidationSchema,
};
