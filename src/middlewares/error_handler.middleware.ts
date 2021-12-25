import { Request, Response, NextFunction } from "express";
import { DatabaseError } from "../models/errors/database.error.model";
import { ForbiddenError } from "../models/errors/forbidden.error.model";

export const errorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof DatabaseError) {
    return response.status(400).json({ error: error.message });
  }
  if (error instanceof ForbiddenError) {
    return response.status(400).json({ error: error.message });
  } else {
    return response.sendStatus(500);
  }
};
