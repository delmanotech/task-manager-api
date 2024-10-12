import { NextFunction, Request, Response } from "express";
import ProjectService from "../services/projectService";

class ProjectController {
  constructor() {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const project = await ProjectService.createProject(
        req.body.name,
        req.body.description,
        (req as any).user.userId
      );
      res.status(201).json(project);
    } catch (error: any) {
      console.log(error)
      next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const projects = await ProjectService.getProjects(
        (req as any).user.userId
      );
      res.status(200).json(projects);
    } catch (error: any) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const project = await ProjectService.getProjectById(req.params.id);
      res.status(200).json(project);
    } catch (error: any) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const project = await ProjectService.updateProject(
        req.params.id,
        req.body
      );
      res.status(200).json(project);
    } catch (error: any) {
      next(error);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await ProjectService.deleteProject(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      next(error);
    }
  }
}

export default new ProjectController();
