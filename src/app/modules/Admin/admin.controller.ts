import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { adminServices } from "./admin.service";

const updateUserStatus = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const result = await adminServices.updateUserStatusIntoDB(userId, req.body);
  res.status(StatusCodes.OK).json({
    success: true,
    statusCode: StatusCodes.OK,
    message: "User blocked successfully",
  });
});
const deleteUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const result = await adminServices.deleteUserFromDB(userId);
  res.status(StatusCodes.OK).json({
    success: true,
    statusCode: StatusCodes.OK,
    message: "User deleted successfully",
  });
});
export const adminControllers = {
  updateUserStatus,
  deleteUser,
};
