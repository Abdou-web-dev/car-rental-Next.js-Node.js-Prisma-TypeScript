import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// POST /api/user/signup - User registration
router.post("/signup", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check if user with the same email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("Another user already exists with this email");
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // Hash the password before saving to database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user in the database
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    console.log(newUser, "newUser was created abd added to the db successfully");

    // Construct user object to send back (excluding sensitive fields)
    const userToSend = {
      // non-sensitive fields
      id: newUser.id,
      email: newUser.email,
    };

    // Generate JWT token
    const accessToken = jwt.sign({ userId: newUser.id }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "1h", // Example: token expires in 1 hour
    });

    // Send response including accessToken and user object
    const response = {
      accessToken,
      user: userToSend,
    };

    console.log("User registered successfully:", userToSend);

    res.status(201).json({ message: "User registered successfully", response });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
