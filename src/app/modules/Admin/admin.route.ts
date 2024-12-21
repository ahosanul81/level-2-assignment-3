import express from "express";
import { adminControllers } from "./admin.controller";
import validateRequest from "../../middleWares/validateRequest";
import { userValidation } from "../User/user.zod.validation";
import auth from "../../middleWares/auth";
import { UserRole } from "../User/user.constants";

const adminRouter = express.Router();

adminRouter.patch(
  "/users/:userId",
  auth(UserRole.admin),
  validateRequest(userValidation.updateUserValidationSchema),
  adminControllers.updateUserStatus
);
adminRouter.delete(
  "/users/:userId",
  auth(UserRole.admin),
  adminControllers.deleteUser
);

export default adminRouter;
