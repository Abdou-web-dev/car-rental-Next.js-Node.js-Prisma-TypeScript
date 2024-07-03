import express, { Request, RequestHandler, Response } from "express";
// import { PrismaClient } from "@prisma/client";
import { CreateNewCar, getAllCars, getCarById } from "../controllers/carsController";
import checkAuthToken from "../middlewares/authenticate";

// Initialize Express router
const router = express.Router();

// GET /api/cars - Get all cars
router.get("/", checkAuthToken as RequestHandler, getAllCars);

// GET /api/cars/:id - Get details of a specific car
router.get("/:id", checkAuthToken as RequestHandler, getCarById);

// POST /api/cars - Create a new car
router.post("/", checkAuthToken as RequestHandler, CreateNewCar);

export default router;
