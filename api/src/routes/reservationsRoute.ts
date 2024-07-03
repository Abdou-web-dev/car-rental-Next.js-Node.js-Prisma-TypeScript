import express, { Request, RequestHandler, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {
  createReservation,
  getReservationsWithDuration,
  updateReservation,
} from "../controllers/reservationsController";
import checkAuthToken from "../middlewares/authenticate";

// Initialize Express router
const router = express.Router();

// GET /api/reservations/duration - Get reservations with duration
// @ts-ignore
router.get("/duration", checkAuthToken, getReservationsWithDuration);

// PUT /api/reservations/:id
router.put("/:id", checkAuthToken as RequestHandler, updateReservation);

// POST /api/reservations - Create a new reservation
// @ts-ignore
router.post("/", checkAuthToken as RequestHandler, createReservation);

// GET /api/reservations/users/:id - Get reservations by user ID
// router.get('/users/:id', );

export default router;
