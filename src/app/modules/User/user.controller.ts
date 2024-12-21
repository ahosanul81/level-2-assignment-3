import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";

const createUser = catchAsync(async (req, res) => {
  const result = await userServices.createUserIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User registerd successfully",
    data: result,
  });
});

export const userControllers = {
  createUser,
};
