import { Request, Response, NextFunction } from "express";
import Project from "../models/Project";
import Task from "../models/Task";

export const verifyProjectOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (project.owner.toString() !== (req as any).user.userId) {
      return res.status(403).json({ message: "Access denied - Owner Error" });
    }

    next();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const verifyTaskAssignee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.assignedTo.toString() !== (req as any).user.userId) {
      return res
        .status(403)
        .json({ message: "Access denied - Task not assigned to you" });
    }

    next();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
