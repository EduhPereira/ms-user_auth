import { Router, Request, Response, NextFunction } from "express";
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
  async (request: Request, response: Response, next: NextFunction) => {
    const users = await userRepository.getAll();
    return response.json(users);
  }
);
//get user by id
usersRoute.get(
  "/users/:uuid",
  async (
    request: Request<{ uuid: string }>,
    response: Response,
    next: NextFunction
  ) => {
    const uuid = request.params.uuid;
    const user = await userRepository.getById(uuid);
    return response.json(user);
  }
);
//post user
usersRoute.post(
  "/users",
  async (request: Request, response: Response, next: NextFunction) => {
    const newUser = request.body;
    const uuid = await userRepository.create(newUser);
    response.status(201).json({ message: `user ${uuid} registered` });
  }
);
//put user
usersRoute.put(
  "/users/:uuid",
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
  (
    request: Request<{ uuid: string }>,
    response: Response,
    next: NextFunction
  ) => {
    const uuid = request.params.uuid;
  }
);
