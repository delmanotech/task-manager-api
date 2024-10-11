import express from "express";
import userController from "../controllers/userController";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

/**
 * @typedef {object} UserParams
 * @property {string} email.required - Email of the user
 * @property {string} password.required - Password of the user
 * @property {array<string>} roles - Roles of the user - eg: ["admin", "user"]
 */

/**
 * @typedef {object} User
 * @property {string} _id - User ID
 * @property {string} email - Email of the user
 * @property {string} password - Password of the user
 * @property {array<string>} roles - Roles of the user - eg: ["admin", "user"]
 */

/**
 * GET /api/users
 * @summary Get a list of users
 * @tags Users
 * @security BearerAuth
 * @return {array<User>} 200 - success response - application/json
 * @return {object} 400 - error response - application/json
 */
router.get("/", authenticate, userController.listUsers);

/**
 * GET /api/users/{id}
 * @summary Get a user by ID
 * @tags Users
 * @security BearerAuth
 * @param {string} id.path.required - User ID
 * @return {User} 200 - success response - application/json
 * @return {object} 404 - user not found - application/json
 */
router.get("/:id", authenticate, userController.getUser);

/**
 * PUT /api/users/{id}
 * @summary Update a user
 * @tags Users
 * @security BearerAuth
 * @param {string} id.path.required - User ID
 * @param {UserParams} request.body.required - User update info
 * @return {User} 200 - success response - application/json
 * @return {object} 400 - error response - application/json
 * @return {object} 404 - user not found - application/json
 */
router.put("/:id", authenticate, userController.editUser);

/**
 * DELETE /api/users/{id}
 * @summary Delete a user
 * @tags Users
 * @security BearerAuth
 * @param {string} id.path.required - User ID
 * @return {object} 204 - success response - no content
 * @return {object} 404 - user not found - application/json
 */
router.delete("/:id", authenticate, userController.removeUser);

export default router;
