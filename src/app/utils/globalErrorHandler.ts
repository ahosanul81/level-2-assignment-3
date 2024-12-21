import { NextFunction, Request, Response } from "express";
import { handleValidationError } from "../errorHandles/handleValidationError";
import { TErrorerrorSources } from "../interfaces.ts/tErrorResponse";
import { AppError } from "./appError";
import handleZodError from "../errorHandles/handleZodError";

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong";
  let errorSources: TErrorerrorSources[] = [
    { message: "Something went wrong", path: "" },
  ];

  if (error.name === "ZodError") {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (error.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (error instanceof AppError) {
    message = error?.message;
    statusCode = error?.statusCode;
    errorSources = [
      {
        path: "",
        message: error?.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message: error.name,
    statusCode,
    errorSources,

    stack: error?.stack || null,
  });
};
