
import type { NextFunction, Request, Response } from "express";

export const errorHandlerMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const formattedError = {
    message: error.message || "une erreur est survenue",
    code: error.statusCode || 500
  };

  res.jsonError(formattedError.message, formattedError.code);
};