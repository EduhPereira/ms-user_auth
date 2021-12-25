import { Request, Response, NextFunction } from "express";
import { ForbiddenError } from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";

export const basicAuthenticationMiddleware = async (
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

    if (authenticationType !== "Basic" || !token) {
      throw new ForbiddenError(`invalid authentication`);
    }

    const tokenContent = Buffer.from(token, "base64").toString("utf-8");

    const [username, password] = tokenContent.split(":");

    if (!username || !password) {
      throw new ForbiddenError("invalid credentials");
    }

    const user = await userRepository.findByUsernameAndPassword(
      username,
      password
    );

    if (!user) {
      throw new ForbiddenError("invalid user or password");
    }

    request.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
