"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleWares/validateRequest"));
const blog_zod_validation_1 = require("./blog.zod.validation");
const blog_controller_1 = require("./blog.controller");
const auth_1 = __importDefault(require("../../middleWares/auth"));
const user_constants_1 = require("../User/user.constants");
const blogRouter = express_1.default.Router();
blogRouter.post("/create-blog", (0, auth_1.default)(user_constants_1.UserRole.admin, user_constants_1.UserRole.user), (0, validateRequest_1.default)(blog_zod_validation_1.blogValidation.createBlogValidationSchema), blog_controller_1.blogControllers.createBlog);
blogRouter.patch("/:id", (0, auth_1.default)(user_constants_1.UserRole.admin), (0, validateRequest_1.default)(blog_zod_validation_1.blogValidation.updateBlogValidationSchema), blog_controller_1.blogControllers.updateBlog);
blogRouter.delete("/:id", (0, auth_1.default)(user_constants_1.UserRole.admin, user_constants_1.UserRole.user), blog_controller_1.blogControllers.deleteBlog);
blogRouter.get("/", blog_controller_1.blogControllers.getAllBlogs);
exports.default = blogRouter;
