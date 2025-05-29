import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exception/http-exception";

export function notFoundMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  throw new HttpException("Route not found.", 404, "Not Found");
}
