import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User logged in successfully",
    data: result,
  });
});

export const authControllers = {
  loginUser,
};
