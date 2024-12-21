import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import userRouter from "./modules/User/user.route";
import { globalErrorHandler } from "./utils/globalErrorHandler";
import authRouter from "./modules/Auth/auth.route";
import blogRouter from "./modules/Blog/blog.route";
import adminRouter from "./modules/Admin/admin.route";
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

app.use("/api/auth/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/admin", adminRouter);

app.get("/", (req: Request, res: Response) => {
  res.json("Blog server is running");
});

app.use(globalErrorHandler);

export default app;
