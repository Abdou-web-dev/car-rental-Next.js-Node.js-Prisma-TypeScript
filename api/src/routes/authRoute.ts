import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// Login endpoint: POST /api/auth/login
router.post("/login", async (req: Request, res: Response) => {
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

    // Return token
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Logout endpoint: POST /api/auth/logout
router.post("/logout", (req: Request, res: Response) => {
  // Implement logout logic as needed (e.g., invalidate tokens, clear session)
  res.json({ message: "Logged out successfully" });
});

// Export the router
export default router;
