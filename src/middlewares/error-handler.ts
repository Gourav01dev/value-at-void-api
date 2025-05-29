import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exception/http-exception";

export function errorHandlerMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const statusCode = err instanceof HttpException ? err.statusCode : 500;
  const error = err instanceof HttpException ? err.error : "Internal Server Error";
  const message = err.message || "An unexpected error occurred";

  res.status(statusCode).json({
    statusCode,
    error,
    message
  });
}
