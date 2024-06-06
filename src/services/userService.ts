import User, { IUser } from "../models/User";

export const getAllUsers = async (): Promise<IUser[]> => {
  return await User.find().select("-password");
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id).select("-password");
};

export const updateUser = async (
  id: string,
  updates: Partial<IUser>
): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(id, updates, { new: true });
};

export const deleteUser = async (id: string): Promise<void> => {
  await User.findByIdAndDelete(id);
};
