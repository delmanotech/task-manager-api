import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  roles: string[];
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: { type: [String], default: ["user"] },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
