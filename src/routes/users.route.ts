import { Router, Request, Response, NextFunction } from "express";
import userRepository from "../repositories/user.repository";

export const userRoute = Router();

//status
userRoute.get(
  "/users/status",
  (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json({ message: "service online" });
  }
);
//get users
userRoute.get(
  "/users",
  async (request: Request, response: Response, next: NextFunction) => {
    const users = await userRepository.getAll();
    return response.json(users);
  }
);
//get user by id
userRoute.get(
  "/users/:uuid",
  (
    request: Request<{ uuid: string }>,
    response: Response,
    next: NextFunction
  ) => {
    const uuid = request.params.uuid;
  }
);
//post user
userRoute.post(
  "/users",
  (request: Request, response: Response, next: NextFunction) => {
    const newUser = request.body;
  }
);
//put user
userRoute.put(
  "/users/:uuid",
  (
    request: Request<{ uuid: string }>,
    response: Response,
    next: NextFunction
  ) => {
    const uuid = request.params.uuid;
    const updatedUser = request.body;
  }
);
//delete user
userRoute.delete(
  "/users/:uuid",
  (
    request: Request<{ uuid: string }>,
    response: Response,
    next: NextFunction
  ) => {
    const uuid = request.params.uuid;
  }
);
