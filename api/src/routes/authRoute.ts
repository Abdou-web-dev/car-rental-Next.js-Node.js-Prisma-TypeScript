import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { LoginHandler } from "../controllers/authController";

const prisma = new PrismaClient();
const router = express.Router();

// Login endpoint: POST /api/auth/login
router.post("/login", LoginHandler);

// Logout endpoint: POST /api/auth/logout
router.post("/logout", (req: Request, res: Response) => {
  // Just respond with a success message; client handles token deletion
  res.status(200).json({ message: "User logged out successfully" });
});

// Export the router
export default router;
