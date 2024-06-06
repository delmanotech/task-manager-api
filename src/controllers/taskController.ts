import { Request, Response } from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../services/taskService";

export const create = async (req: Request, res: Response) => {
  try {
    const task = await createTask(
      req.body.name,
      req.body.description,
      req.body.project,
      req.body.assignedTo,
      req.body.dueDate
    );
    res.status(201).json(task);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const list = async (req: Request, res: Response) => {
  try {
    const tasks = await getTasks(req.params.projectId);
    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const task = await updateTask(req.params.id, req.body);
    res.status(200).json(task);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await deleteTask(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
