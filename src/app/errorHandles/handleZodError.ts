import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import { ZodError, ZodIssue } from "zod";
import {
  TErrorerrorSources,
  TErrorResponse,
} from "../interfaces.ts/tErrorResponse";

const handleZodError = (error: ZodError): TErrorResponse => {
  const errorSources: TErrorerrorSources[] = error.issues.map(
    (issue: ZodIssue) => {
      return {
        message: issue?.message,
        path: "",
      };
    }
  );
  const statusCode = 400;
  return {
    success: false,
    statusCode,
    message: "validation error",
    errorSources,
  };
};

export default handleZodError;
