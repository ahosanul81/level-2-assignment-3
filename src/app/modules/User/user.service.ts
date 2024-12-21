import { StatusCodes } from "http-status-codes";
import { AppError } from "../../utils/appError";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUserIntoDB = async (payload: TUser) => {
  const isExistUser = await UserModel.findOne({ email: payload?.email });
  if (isExistUser) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "Another user exists in provided email"
    );
  }
  const result = await UserModel.create(payload);
  return result;
};

export const userServices = {
  createUserIntoDB,
};
