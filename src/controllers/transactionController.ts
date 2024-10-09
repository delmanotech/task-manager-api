import { Request, Response } from "express";
import {
  createTransaction,
  deleteTransaction,
  getTransactionById,
  getTransactions,
  updateTransaction,
} from "../services/transactionService";
import { TransactionsRequestFilters } from "../models/Transaction";

export class TransactionController {
  constructor() {}

  async create(req: Request, res: Response) {
    try {
      const transaction = await createTransaction(req.body);
      res.status(201).json(transaction);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
  async list(req: Request, res: Response) {
    try {
      const filters: TransactionsRequestFilters = {
        paid: req.query.paid === "true",
        type: req.query.type as "income" | "expense",
        dateFrom: req.query.dateFrom
          ? new Date(req.query.dateFrom as string)
          : undefined,
        dateTo: req.query.dateTo
          ? new Date(req.query.dateTo as string)
          : undefined,
        createdBy: req.query.createdBy as string,
      };

      const transactions = await getTransactions(req.params.projectId, filters);
      res.status(200).json(transactions);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
  async getById(req: Request, res: Response) {
    try {
      const transaction = await getTransactionById(req.params.id);
      res.status(200).json(transaction);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
  async update(req: Request, res: Response) {
    try {
      const transaction = await updateTransaction(req.params.id, req.body);
      res.status(200).json(transaction);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
  async remove(req: Request, res: Response) {
    try {
      await deleteTransaction(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new TransactionController();
