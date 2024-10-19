import express from "express";
import categoryController from "../controllers/categoryController";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

/**
 * @typedef {object} CategoryParams
 * @property {string} name.required - Name of the category
 * @property {string} type.required - Type of the category (income or expense)
 * @property {string} project.required - Project ID the category belongs to
 */

/**
 * @typedef {object} Category
 * @property {string} _id - Category ID
 * @property {string} name - Name of the category
 * @property {string} type - Type of the category (income or expense)
 * @property {string} project - Project ID the category belongs to
 */

/**
 * GET /api/categories
 * @summary Get a list of categories for a project
 * @tags Categories
 * @security BearerAuth
 * @param {string} projectId.query.required - Project ID
 * @return {array<Category>} 200 - success response - application/json
 * @return {object} 400 - error response - application/json
 */
router.get("/", authenticate, categoryController.list);

/**
 * GET /api/categories/{id}
 * @summary Get a category by ID
 * @tags Categories
 * @security BearerAuth
 * @param {string} id.path.required - Category ID
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - error response - application/json
 * @return {object} 404 - category not found - application/json
 */
router.get("/:id", authenticate, categoryController.getById);

/**
 * POST /api/categories
 * @summary Create a new category
 * @tags Categories
 * @security BearerAuth
 * @param {CategoryParams} request.body.required - Category info
 * @return {object} 201 - success response - application/json
 * @return {object} 400 - error response - application/json
 */
router.post("/", authenticate, categoryController.create);

/**
 * PUT /api/categories/{id}
 * @summary Update a category
 * @tags Categories
 * @security BearerAuth
 * @param {string} id.path.required - Category ID
 * @param {CategoryParams} request.body.required - Category update info
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - error response - application/json
 * @return {object} 404 - category not found - application/json
 */
router.put("/:id", authenticate, categoryController.update);

/**
 * DELETE /api/categories/{id}
 * @summary Delete a category
 * @tags Categories
 * @security BearerAuth
 * @param {string} id.path.required - Category ID
 * @return {object} 204 - success response - no content
 * @return {object} 404 - category not found - application/json
 */
router.delete("/:id", authenticate, categoryController.remove);

export default router;
