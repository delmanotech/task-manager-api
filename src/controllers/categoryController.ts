import { Request, Response, NextFunction } from "express";
import CategoryService from "../services/categoryService";
import { AuthRequest } from "../middlewares/authMiddleware";
import { CreateCategoryRequest } from "../models/Category";

class CategoryController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryService.getCategories(
        req.query.projectId as string
      );
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { body } = req as { body: CreateCategoryRequest };
      const category = await CategoryService.createCategory({
        ...body,
        createdBy: req.user.userId,
      });
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await CategoryService.getCategoryById(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, type } = req.body;
      const category = await CategoryService.updateCategory(req.params.id, {
        name,
        type,
      });
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await CategoryService.deleteCategory(req.params.id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new CategoryController();
