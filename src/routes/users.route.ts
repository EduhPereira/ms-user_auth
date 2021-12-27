import { Router, Request, Response, NextFunction } from "express";
import { bearerAuthentication } from "../middlewares/bearer_authentication.middleware";
import userRepository from "../repositories/user.repository";

export const usersRoute = Router();

//status
usersRoute.get(
  "/users/status",
  (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json({ message: "service online" });
  }
);
//get users
usersRoute.get(
  "/users",
  bearerAuthentication,
  async (request: Request, response: Response, next: NextFunction) => {
    const users = await userRepository.getAll();
    return response.json(users);
  }
);
//get user by id
usersRoute.get(
  "/users/:uuid",
  bearerAuthentication,
  async (
    request: Request<{ uuid: string }>,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const uuid = request.params.uuid;
      const user = await userRepository.getById(uuid);
      return response.json(user);
    } catch (error) {
      next(error);
    }
  }
);
//post user
usersRoute.post(
  "/users",
  bearerAuthentication,
  async (request: Request, response: Response, next: NextFunction) => {
    const newUser = request.body;
    const uuid = await userRepository.create(newUser);
    response.status(201).json({ message: `user ${uuid} registered` });
  }
);
//put user
usersRoute.put(
  "/users/:uuid",
  bearerAuthentication,
  async (
    request: Request<{ uuid: string }>,
    response: Response,
    next: NextFunction
  ) => {
    const uuid = request.params.uuid;
    const updatedUser = request.body;
    updatedUser.uuid = uuid;
    await userRepository.update(updatedUser);
    response.status(200).json();
  }
);
//delete user
usersRoute.delete(
  "/users/:uuid",
  bearerAuthentication,
  async (
    request: Request<{ uuid: string }>,
    response: Response,
    next: NextFunction
  ) => {
    const uuid = request.params.uuid;
    await userRepository.remove(uuid);
    return response.status(204).json();
  }
);
