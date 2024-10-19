import express from "express";
import transactionController from "../controllers/transactionController";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

/**
 * @typedef {object} TransactionParams
 * @property {string} project.required - Project ID
 * @property {string} name.required - Transaction name
 * @property {string} type.required - Transaction type
 * @property {number} amount.required - Transaction amount
 * @property {string} date.required - Transaction date
 * @property {string} category.required - Transaction category
 */
/**
 *
 * @typedef {object} Transaction
 * @property {string} _id - Transaction ID
 * @property {string} project - Project ID
 * @property {string} name - Transaction name
 * @property {string} type - Transaction type
 * @property {number} amount - Transaction amount
 * @property {string} date - Transaction date
 * @property {string} category - Transaction category
 * @property {string} createdBy - User ID of the transaction creator
 * @property {string} createdAt - Transaction creation date
 * @property {string} updatedAt - Transaction update date
 * @property {boolean} paid - Transaction payment status
 * @property {string} paymentDate - Transaction payment date
 *
 */

/**
 *
 * GET /api/transactions
 * @summary Get a list of transactions for a project
 * @tags Transactions
 * @security BearerAuth
 * @param {string} projectId.query.required - Project ID
 * @param {string} paid.query - Filter by payment status
 * @param {string} type.query - Filter by transaction type
 * @param {string} dateFrom.query - Filter by start date
 * @param {string} dateTo.query - Filter by end date
 * @param {string} createdBy.query - Filter by creator ID
 * @param {string} category.query - Filter by category ID
 * @return {array<Transaction>} 200 - success response - application/json
 * @return {object} 400 - error response - application/json
 * @return {object} 404 - project not found - application/json
 *
 */
router.get("/", authenticate, transactionController.list);

/**
 *
 * GET /api/transactions/{id}
 * @summary Get a transaction by ID
 * @tags Transactions
 * @security BearerAuth
 * @param {string} id.path.required - Transaction ID
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - error response - application/json
 * @return {object} 404 - transaction not found - application/json
 *
 */
router.get("/:id", authenticate, transactionController.getById);

/**
 *
 * POST /api/transactions
 * @summary Create a new transaction
 * @tags Transactions
 * @security BearerAuth
 * @param {TransactionParams} request.body.required - Transaction info
 * @return {object} 201 - success response - application/json
 * @return {object} 400 - error response - application/json
 *
 */

router.post("/", authenticate, transactionController.create);

/**
 *
 * PUT /api/transactions/{id}
 * @summary Update a transaction
 * @tags Transactions
 * @security BearerAuth
 * @param {string} id.path.required - Transaction ID
 * @param {TransactionParams} request.body.required - Transaction update info
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - error response - application/json
 * @return {object} 404 - transaction not found - application/json
 *
 */
router.put("/:id", authenticate, transactionController.update);

/**
 *
 * DELETE /api/transactions/{id}
 * @summary Delete a transaction
 * @tags Transactions
 * @security BearerAuth
 * @param {string} id.path.required - Transaction ID
 * @return {object} 204 - success response - no content
 * @return {object} 404 - transaction not found - application/json
 *
 */
router.delete("/:id", authenticate, transactionController.remove);

export default router;
