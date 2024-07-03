import { Request, Response } from "express";
import UsersService from "../services/usersService";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { validateSignUp } from "../validation/auth";

const usersService = new UsersService();
const prisma = new PrismaClient();

export const SignUpHandler = async (req: Request, res: Response) => {
  const { error } = validateSignUp(req.body); // Validate request body
  if (error) {
    console.log("signup error", error.details[0].message);
    return res.status(400).json({ message: error.details[0].message });
  }

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

    console.log(newUser, "a new user was created and added to the db successfully");

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
};

// GET /api/users/:id/reservations
export const getUserReservations = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const reservations = await usersService.getUserReservations(parseInt(id, 10));
    res.status(200).json(reservations);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/users/reservations-summary
export const getUsersReservationsSummary = async (req: Request, res: Response) => {
  try {
    const usersSummary = await usersService.getUsersWithReservationsSummary();
    res.status(200).json(usersSummary);
  } catch (error) {
    console.error("Error fetching users reservations summary:", error);
    res.status(500).json({ message: "Failed to fetch users reservations summary" });
  }
};
