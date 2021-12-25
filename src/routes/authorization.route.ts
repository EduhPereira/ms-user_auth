import { Router, Request, Response, NextFunction } from "express";
import { ForbiddenError } from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";
import JWT from "jsonwebtoken";
import { basicAuthenticationMiddleware } from "../middlewares/basic_authentication.middleware";

export const authorizationRoute = Router();

authorizationRoute.post(
  "/token",
  basicAuthenticationMiddleware,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const user = request.user;
      const jwtPayload = { username: user?.username };
      const jwtOptions = { subject: user?.uuid };
      const secretKey = "my_secret_key";

      const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);

      response.status(200).json({ token: jwt });
    } catch (error) {
      next(error);
    }
  }
);
