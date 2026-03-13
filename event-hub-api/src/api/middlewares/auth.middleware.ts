import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type JwtPayload = {
  sub?: string;
  email?: string;
};

export function requireAuth() {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const header = req.headers.authorization ?? "";
      const [kind, token] = header.split(" ");

      if (kind?.toLowerCase() !== "bearer" || !token) {
        throw Object.assign(new Error("Unauthorized"), { statusCode: 401 });
      }

      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw Object.assign(new Error("JWT_SECRET is not configured"), { statusCode: 500 });
      }

      const decoded = jwt.verify(token, secret) as JwtPayload;

      if (!decoded?.sub) {
        throw Object.assign(new Error("Unauthorized"), { statusCode: 401 });
      }

      req.auth = {
        userId: decoded.sub,
        email: decoded.email,
      };

      next();
    } catch (err) {
      next(err);
    }
  };
}