import express from "express";
import { create, list, update, remove } from "../controllers/taskController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

/**
 * @typedef {object} TaskParams
 * @property {string} name.required - Name of the task
 * @property {string} description - Description of the task
 * @property {string} project.required - Project ID the task belongs to
 * @property {string} assignedTo - User ID assigned to the task
 * @property {string} status - Status of the task
 * @property {string} dueDate - Due date of the task
 */

/**
 * @typedef {object} Task
 * @property {string} _id - Task ID
 * @property {string} name - Name of the task
 * @property {string} description - Description of the task
 * @property {string} project - Project ID the task belongs to
 * @property {string} assignedTo - User ID assigned to the task
 * @property {string} status - Status of the task
 * @property {string} dueDate - Due date of the task
 */

/**
 * GET /api/tasks/{projectId}
 * @summary Get a list of tasks for a project
 * @tags Tasks
 * @security BearerAuth
 * @param {string} projectId.path.required - Project ID
 * @return {array<Task>} 200 - success response - application/json
 * @return {object} 400 - error response - application/json
 */
router.get("/:projectId", authMiddleware, list);

/**
 * POST /api/tasks
 * @summary Create a new task
 * @tags Tasks
 * @security BearerAuth
 * @param {TaskParams} request.body.required - Task info
 * @return {object} 201 - success response - application/json
 * @return {object} 400 - error response - application/json
 */
router.post("/", authMiddleware, create);

/**
 * PUT /api/tasks/{id}
 * @summary Update a task
 * @tags Tasks
 * @security BearerAuth
 * @param {string} id.path.required - Task ID
 * @param {TaskParams} request.body.required - Task update info
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - error response - application/json
 * @return {object} 404 - task not found - application/json
 */
router.put("/:id", authMiddleware, update);

/**
 * DELETE /api/tasks/{id}
 * @summary Delete a task
 * @tags Tasks
 * @security BearerAuth
 * @param {string} id.path.required - Task ID
 * @return {object} 204 - success response - no content
 * @return {object} 404 - task not found - application/json
 */
router.delete("/:id", authMiddleware, remove);

export default router;
