import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { CustomError } from "../utils/custom-error";

class AuthService {
  public static async registerUser(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    const token = AuthService.generateToken(user._id.toString());
    return {
      token,
      user: {
        _id: user._id.toString(),
        email: user.email,
        roles: user.roles,
      },
    };
  }

  public static async loginUser(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) throw new CustomError("Invalid email or password", 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new CustomError("Invalid email or password", 401);

    const token = AuthService.generateToken(user._id.toString());

    return {
      token,
      user: {
        _id: user._id.toString(),
        email: user.email,
        roles: user.roles,
      },
    };
  }

  private static generateToken(userId: string) {
    return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "24h" });
  }
}

export default AuthService;
