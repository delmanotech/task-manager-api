import { NextFunction, Request, Response } from "express";
import UserService from "../services/userService";

class UserController {
  constructor() {}

  async listUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async editUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async removeUser(req: Request, res: Response, next: NextFunction) {
    try {
      await UserService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
