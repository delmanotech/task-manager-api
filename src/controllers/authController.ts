import { Request, Response, NextFunction } from "express";
import AuthService from "../services/authService";

class AuthController {
  constructor() {}

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await AuthService.registerUser(
        req.body.email,
        req.body.password
      );
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await AuthService.loginUser(
        req.body.email,
        req.body.password
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
