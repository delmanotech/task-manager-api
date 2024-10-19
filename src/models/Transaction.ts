import mongoose, { Document, Schema } from "mongoose";

export interface ITransaction extends Document {
  description: string;
  amount: number;
  type: "income" | "expense";
  paid: boolean;
  paymentDate: Date;
  project: mongoose.Schema.Types.ObjectId;
  category: mongoose.Schema.Types.ObjectId;
  createdBy: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTransactionRequest {
  description: string;
  amount: number;
  type: "income" | "expense";
  paid: boolean;
  paymentDate: Date;
  project: string;
  category: string;
  createdBy: string;
}

export interface UpdateTransactionRequest {
  description?: string;
  amount?: number;
  category?: string;
  type?: "income" | "expense";
  paid?: boolean;
  paymentDate?: Date;
}

export interface TransactionsRequestFilters {
  paid?: boolean;
  category?: string;
  type?: "income" | "expense";
  dateFrom?: Date;
  dateTo?: Date;
  createdBy?: string;
}

const transactionSchema: Schema = new Schema(
  {
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    paid: { type: Boolean, default: false },
    paymentDate: { type: Date },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  transactionSchema
);

export default Transaction;
