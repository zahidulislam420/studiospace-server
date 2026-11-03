import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/response";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("Unhandled Application Error:", err);

  const statusCode = "status" in err && typeof err.status === "number" ? err.status : 500;
  const message = err.message || "An unexpected internal server error occurred";

  return errorResponse(res, message, statusCode);
}
