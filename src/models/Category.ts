import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  type: "income" | "expense";
  project: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
}

export interface CreateCategoryRequest {
  name: string;
  type: "income" | "expense";
  project: string;
}

const CategorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ICategory>("Category", CategorySchema);
