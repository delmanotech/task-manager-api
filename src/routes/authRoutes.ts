import express from "express";
import { register, login } from "../controllers/authController";

/**
 * @typedef {object} RegisterParams
 * @property {string} email.required - Email of the user
 * @property {string} password.required - Password of the user
 */

const router = express.Router();

/**
 * POST /api/auth/register
 * @summary Register a new user
 * @tags Auth
 * @param {RegisterParams} request.body.required - User registration info
 * @return {object} 201 - success response - application/json
 * @return {object} 400 - error response - application/json
 */
router.post("/register", register);

/**
 * POST /api/auth/login
 * @summary Log in an existing user
 * @tags Auth
 * @param {RegisterParams} request.body.required - User login info
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - error response - application/json
 */
router.post("/login", login);

export default router;
