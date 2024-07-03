// authController.ts
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
      // using a generic error message enhances security and user privacy while maintaining a straightforward and consistent user experience during authentication processes.
    }

    // Generate JWT token
    const accessToken = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "1h", // Example: token expires in 1 hour
    });

    const userToSend = {
      // non-sensitive fields
      id: user.id,
      email: user.email,
    };

    const response = {
      accessToken,
      user: userToSend,
    };

    console.log("User logged in successfully:");

    res.status(200).json({ message: "User logged in successfully", response });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
  // res.status(200).json({ message: "Login endpoint is working" });
};

export { loginUser };
