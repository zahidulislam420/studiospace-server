import { Request, Response, NextFunction } from "express";
import { jwtVerify } from "jose";
import { ENV } from "../config/env";
import { errorResponse } from "../utils/response";

export interface AuthUser {
  email: string;
  name?: string;
  uid?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export async function verifyJWT(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    // Read from HTTPOnly cookie or Bearer token header
    let token = req.cookies?.token;

    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return errorResponse(res, "Unauthorized: Authentication token is missing", 401);
    }

    const secret = new TextEncoder().encode(ENV.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    if (!payload?.email) {
      return errorResponse(res, "Unauthorized: Token payload is invalid", 401);
    }

    req.user = {
      email: String(payload.email),
      name: payload.name ? String(payload.name) : undefined,
      uid: payload.uid ? String(payload.uid) : undefined,
    };

    return next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    return errorResponse(res, "Unauthorized: Invalid or expired token", 401);
  }
}

export async function optionalJWT(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    let token = req.cookies?.token;

    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (token) {
      const secret = new TextEncoder().encode(ENV.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      if (payload?.email) {
        req.user = {
          email: String(payload.email),
          name: payload.name ? String(payload.name) : undefined,
          uid: payload.uid ? String(payload.uid) : undefined,
        };
      }
    }
  } catch {
    // Ignore invalid tokens for optional auth
  }
  return next();
}
