import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

class AuthService {
  public static async registerUser(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    const token = AuthService.generateToken(user._id.toString());
    return { token, userId: user._id.toString(), email: user.email };
  }

  public static async loginUser(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid email or password");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid email or password");

    const token = AuthService.generateToken(user._id.toString());
    return { token, userId: user._id.toString(), email: user.email };
  }

  private static generateToken(userId: string) {
    return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "1h" });
  }
}

export default AuthService;
