import { StatusCodes } from "http-status-codes";
import { AppError } from "../../utils/appError";
import { UserModel } from "../User/user.model";
import { TLoginUser } from "./auth.interface";
import jwt from "jsonwebtoken";
import config from "../../config";
const loginUser = async (payload: TLoginUser) => {
  try {
    const { email, password } = payload;
    const isExistsUser = await UserModel.findOne({ email });
    if (!isExistsUser) {
      throw new AppError(StatusCodes.NOT_FOUND, "User not has not found");
    }
    //   check password

    if (isExistsUser?.password !== password) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Password is not correct");
    }
    //   generate token
    const jwtPayload = {
      email: email,
      role: isExistsUser?.role,
    };

    const accessToken = jwt.sign(
      jwtPayload,
      config.jwt_access_secret as string,
      {
        expiresIn: config.jwt_access_expires_in,
      }
    );
    return {
      accessToken,
    };
  } catch (error) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid credentials");
  }
};

export const authServices = {
  loginUser,
};
