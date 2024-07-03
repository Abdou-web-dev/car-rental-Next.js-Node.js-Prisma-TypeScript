import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const LoginHandler = async (req: Request, res: Response) => {
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      // Check if user exists in database
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        console.log("Login failed: Invalid email");
        return res.status(404).json({ message: "User not found, Invalid email or password" });
      }

      // Validate password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
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

      // Return token
      console.log("User logged in successfully:");

      res.status(200).json({ message: "User logged in successfully", response });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};
