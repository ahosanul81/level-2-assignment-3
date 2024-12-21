import express from "express";
import validateRequest from "../../middleWares/validateRequest";
import { blogValidation } from "./blog.zod.validation";
import { blogControllers } from "./blog.controller";
import auth from "../../middleWares/auth";
import { UserRole } from "../User/user.constants";

const blogRouter = express.Router();

blogRouter.post(
  "/create-blog",
  auth(UserRole.admin, UserRole.user),
  validateRequest(blogValidation.createBlogValidationSchema),
  blogControllers.createBlog
);
blogRouter.patch(
  "/:id",
  auth(UserRole.admin),
  validateRequest(blogValidation.updateBlogValidationSchema),
  blogControllers.updateBlog
);
blogRouter.delete(
  "/:id",
  auth(UserRole.admin, UserRole.user),
  blogControllers.deleteBlog
);
blogRouter.get("/", blogControllers.getAllBlogs);
export default blogRouter;
