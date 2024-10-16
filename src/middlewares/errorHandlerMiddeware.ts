import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/custom-error";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({ message });
  }
};

export default errorHandler;
