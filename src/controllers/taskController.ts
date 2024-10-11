import { Request, Response, NextFunction } from "express";
import TaskService from "../services/taskService";

class TaskController {
  constructor() {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await TaskService.createTask(
        req.body.name,
        req.body.description,
        req.body.project,
        req.body.assignedTo,
        req.body.dueDate
      );
      res.status(201).json(task);
    } catch (error: any) {
      next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const tasks = await TaskService.getTasks(req.params.projectId);
      res.status(200).json(tasks);
    } catch (error: any) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await TaskService.updateTask(req.params.id, req.body);
      res.status(200).json(task);
    } catch (error: any) {
      next(error);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await TaskService.deleteTask(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      next(error);
    }
  }
}

export default new TaskController();
