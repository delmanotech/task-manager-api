import { NextFunction, Request, Response } from "express";

import { TransactionsRequestFilters } from "../models/Transaction";
import TransactionService from "../services/transactionService";

export class TransactionController {
  constructor() {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const transaction = await TransactionService.createTransaction(req.body);
      res.status(201).json(transaction);
    } catch (error) {
      next(error);
    }
  }
  async list(req: Request, res: Response, next: NextFunction) {
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

      const transactions = await TransactionService.getTransactions(
        req.params.projectId,
        filters
      );
      res.status(200).json(transactions);
    } catch (error: any) {
      next(error);
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const transaction = await TransactionService.getTransactionById(
        req.params.id
      );
      res.status(200).json(transaction);
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const transaction = await TransactionService.updateTransaction(
        req.params.id,
        req.body
      );
      res.status(200).json(transaction);
    } catch (error: any) {
      next(error);
    }
  }
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await TransactionService.deleteTransaction(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      next(error);
    }
  }
}

export default new TransactionController();
