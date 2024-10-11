import Transaction, {
  CreateTransactionRequest,
  TransactionsRequestFilters,
  UpdateTransactionRequest,
} from "../models/Transaction";

class TransactionService {
  public static async createTransaction(transaction: CreateTransactionRequest) {
    const newTransaction = new Transaction(transaction);
    await newTransaction.save();
    return newTransaction;
  }

  public static async getTransactions(
    projectId: string,
    filters?: TransactionsRequestFilters
  ) {
    const query: any = {
      project: projectId,
      ...(filters?.paid !== undefined && { paid: filters.paid }),
      ...(filters?.type && { type: filters.type }),
      ...(filters?.createdBy && { createdBy: filters.createdBy }),
      ...(filters?.dateFrom || filters?.dateTo
        ? {
            date: {
              ...(filters.dateFrom && { $gte: filters.dateFrom }),
              ...(filters.dateTo && { $lte: filters.dateTo }),
            },
          }
        : {}),
    };

    const transactions = await Transaction.find(query);
    return transactions;
  }

  public static async getTransactionById(transactionId: string) {
    const transaction = await Transaction.findById(transactionId);
    return transaction;
  }

  public static async updateTransaction(
    transactionId: string,
    updates: UpdateTransactionRequest
  ) {
    const transaction = await Transaction.findByIdAndUpdate(
      transactionId,
      updates,
      {
        new: true,
      }
    );
    return transaction;
  }

  public static async deleteTransaction(transactionId: string) {
    await Transaction.findByIdAndDelete(transactionId);
  }
}

export default TransactionService;
