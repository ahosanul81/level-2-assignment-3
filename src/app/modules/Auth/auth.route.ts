import express from "express";
import { authControllers } from "./auth.controller";
const authRouter = express.Router();

authRouter.post("/login", authControllers.loginUser);
export default authRouter;
