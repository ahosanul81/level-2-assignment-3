import mongoose from "mongoose";
import {
  TErrorResponse,
  TErrorerrorSources,
} from "../interfaces.ts/tErrorResponse";
import { StatusCodes } from "http-status-codes";

export const handleValidationError = (
  error: mongoose.Error.ValidationError
): TErrorResponse => {
  const errorSources: TErrorerrorSources[] = Object.values(error.errors).map(
    (value) => {
      return {
        message: value?.message,
        path: value?.path,
      };
    }
  );

  const statusCode = StatusCodes.BAD_REQUEST || 400;
  return {
    success: false,
    statusCode,
    message: error.message,
    errorSources,
  };
};
