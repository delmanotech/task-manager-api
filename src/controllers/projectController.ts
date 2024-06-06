import { Request, Response } from "express";
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from "../services/projectService";

export const create = async (req: Request, res: Response) => {
  try {
    const project = await createProject(
      req.body.name,
      req.body.description,
      (req as any).user.userId
    );
    res.status(201).json(project);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const list = async (req: Request, res: Response) => {
  try {
    const projects = await getProjects((req as any).user.userId);
    res.status(200).json(projects);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const project = await updateProject(req.params.id, req.body);
    res.status(200).json(project);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await deleteProject(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
