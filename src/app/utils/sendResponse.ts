import { Response } from "express";

const sendResponse = <T>(
  res: Response,
  data: {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
  }
) => {
  res.status(data?.statusCode).json({
    success: data?.success,
    StatusCodes: data?.statusCode,
    message: data?.message,
    data: data?.data || null,
  });
};
export default sendResponse;
