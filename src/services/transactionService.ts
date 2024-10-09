import Transaction, {
  CreateTransactionRequest,
  TransactionsRequestFilters,
  UpdateTransactionRequest,
} from "../models/Transaction";

export const createTransaction = async (
  transaction: CreateTransactionRequest
) => {
  const newTransaction = new Transaction(transaction);

  await newTransaction.save();

  return newTransaction;
};

export const getTransactions = async (
  projectId: string,
  filters?: TransactionsRequestFilters
) => {
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
};

export const getTransactionById = async (transactionId: string) => {
  const transaction = await Transaction.findById(transactionId);

  return transaction;
};

export const updateTransaction = async (
  transactionId: string,
  updates: UpdateTransactionRequest
) => {
  const transaction = await Transaction.findByIdAndUpdate(
    transactionId,
    updates,
    {
      new: true,
    }
  );

  return transaction;
};

export const deleteTransaction = async (transactionId: string) => {
  await Transaction.findByIdAndDelete(transactionId);
};
