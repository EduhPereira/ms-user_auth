import JWT from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ForbiddenError } from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";

export const bearerAuthentication = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = request.headers["authorization"];

    if (!authorizationHeader) {
      throw new ForbiddenError("credentials with missing data");
    }

    const [authenticationType, token] = authorizationHeader.split(" ");

    if (authenticationType !== "Bearer" || !token) {
      throw new ForbiddenError("invalid authentication");
    }

    const tokenPayload = JWT.verify(token, "my_secret_key");

    if (typeof tokenPayload !== "object" || !tokenPayload.sub) {
      throw new ForbiddenError("invalid token");
    }

    const user = {
      uuid: tokenPayload.sub,
      username: tokenPayload.username,
    };
    request.user = user;
  } catch (error) {
    next(error);
  }
};
