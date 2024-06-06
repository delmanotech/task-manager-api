import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";

export const register = async (req: Request, res: Response) => {
  try {
    const { token, userId, email } = await registerUser(
      req.body.email,
      req.body.password
    );
    res.status(201).json({ token, userId, email });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { token, userId, email } = await loginUser(
      req.body.email,
      req.body.password
    );
    res.status(200).json({ token, userId, email });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
