import Category, { CreateCategoryRequest } from "../models/Category";

class CategoryService {
  public static async createCategory(
    body: CreateCategoryRequest & { createdBy: string }
  ) {
    const category = new Category(body);
    await category.save();
    return category;
  }

  public static async getCategories(projectId: string) {
    const categories = await Category.find({ project: projectId }).populate({
      path: "project",
      select: "-__v",
    });
    return categories;
  }

  public static async getCategoryById(categoryId: string) {
    const category = await Category.findById(categoryId).populate({
      path: "project",
      select: "-__v",
    });
    return category;
  }

  public static async updateCategory(categoryId: string, updates: any) {
    const category = await Category.findByIdAndUpdate(categoryId, updates, {
      new: true,
    });
    return category;
  }

  public static async deleteCategory(categoryId: string) {
    await Category.findByIdAndDelete(categoryId);
  }
}

export default CategoryService;
