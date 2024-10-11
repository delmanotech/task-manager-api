import User, { IUser } from "../models/User";

class UserService {
  public static async getAllUsers(): Promise<IUser[]> {
    return await User.find().select("-password");
  }

  public static async getUserById(id: string): Promise<IUser | null> {
    return await User.findById(id).select("-password");
  }

  public static async updateUser(
    id: string,
    updates: Partial<IUser>
  ): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, updates, { new: true });
  }

  public static async deleteUser(id: string): Promise<void> {
    await User.findByIdAndDelete(id);
  }
}

export default UserService;
