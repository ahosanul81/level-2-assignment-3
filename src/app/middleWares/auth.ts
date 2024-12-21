import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../modules/User/user.constants";
import catchAsync from "../utils/catchAsync";
import { AppError } from "../utils/appError";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { UserModel } from "../modules/User/user.model";
const auth = (...roles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(StatusCodes.FORBIDDEN, "You are not authorized");
    }
    // verify token
    const decoded = jwt.verify(token, config.jwt_access_secret as string);

    if (roles && !roles.includes((decoded as JwtPayload).role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized ");
    }
    console.log(decoded);

    const { email, role, iat } = decoded as JwtPayload;
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, "User not found");
    }
    if (user.isBlocked === true) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "You are blocked");
    }
    next();
  });
};
export default auth;
