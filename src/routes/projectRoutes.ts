import express from "express";
import { authenticate } from "../middlewares/authMiddleware";
import { verifyProjectOwner } from "../middlewares/permissionsMiddleware";
import projectController from "../controllers/projectController";

const router = express.Router();

/**
 * @typedef {object} ProjectParams
 * @property {string} name.required - Name of the project
 * @property {string} description - Description of the project
 * @property {array<string>} members - List of member IDs
 */

/**
 * @typedef {object} Project
 * @property {string} _id - Project ID
 * @property {string} name - Name of the project
 * @property {string} description - Description of the project
 * @property {string} owner - User ID of the project owner
 * @property {array<string>} members - List of member IDs
 */

/**
 * GET /api/projects
 * @summary Get a list of projects
 * @tags Projects
 * @security BearerAuth
 * @return {array<Project>} 200 - success response - application/json
 * @return {object} 400 - error response - application/json
 */
router.get("/", authenticate, projectController.list);

/**
 * GET /api/projects/{id}
 * @summary Get a project by ID
 * @tags Projects
 * @security BearerAuth
 * @param {string} id.path.required - Project ID
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - error response - application/json
 * @return {object} 404 - project not found - application/json
 */
router.get("/:id", authenticate, projectController.getById);

/**
 * POST /api/projects
 * @summary Create a new project
 * @tags Projects
 * @security BearerAuth
 * @param {ProjectParams} request.body.required - Project info
 * @return {object} 201 - success response - application/json
 * @return {object} 400 - error response - application/json
 */
router.post("/", authenticate, projectController.create);

/**
 * PUT /api/projects/{id}
 * @summary Update a project
 * @tags Projects
 * @security BearerAuth
 * @param {string} id.path.required - Project ID
 * @param {ProjectParams} request.body.required - Project update info
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - error response - application/json
 * @return {object} 404 - project not found - application/json
 */
router.put("/:id", authenticate, verifyProjectOwner, projectController.update);

/**
 * DELETE /api/projects/{id}
 * @summary Delete a project
 * @tags Projects
 * @security BearerAuth
 * @param {string} id.path.required - Project ID
 * @return {object} 204 - success response - no content
 * @return {object} 404 - project not found - application/json
 */
router.delete(
  "/:id",
  authenticate,
  verifyProjectOwner,
  projectController.remove
);

export default router;
