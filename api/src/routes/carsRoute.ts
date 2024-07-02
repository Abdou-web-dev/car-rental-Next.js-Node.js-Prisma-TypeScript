import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { CustomRequest, User } from "../types/types"; // Adjust path as per your project structure
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// Initialize Express router
const router = express.Router();

export default router;
