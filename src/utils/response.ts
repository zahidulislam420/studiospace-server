import { Response } from "express";

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function successResponse<T>(
  res: Response,
  data: T,
  message?: string,
  statusCode = 200,
  pagination?: ApiResponse["pagination"]
): Response {
  const payload: ApiResponse<T> = {
    success: true,
    data,
    ...(message ? { message } : {}),
    ...(pagination ? { pagination } : {}),
  };
  return res.status(statusCode).json(payload);
}

export function errorResponse(
  res: Response,
  error: string,
  statusCode = 400
): Response {
  return res.status(statusCode).json({
    success: false,
    error,
    message: error,
  });
}
