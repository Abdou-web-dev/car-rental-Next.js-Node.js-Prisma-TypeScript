import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getAllCars, getCarById } from "../controllers/carsController";

// Initialize Express router
const router = express.Router();

// GET /api/cars - Get all cars
router.get("/", getAllCars);

// GET /api/cars/:id - Get details of a specific car
router.get("/:id", getCarById);

// POST /api/cars - Create a new car
// router.post("/");

export default router;
