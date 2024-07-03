import express, { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";
import { SignUpHandler, getUserReservations, getUsersReservationsSummary } from "../controllers/usersController";

const prisma = new PrismaClient();
const router = express.Router();

// POST /api/users/signup - User registration
router.post("/signup", SignUpHandler);

// GET /api/users/reservations-summary
router.get("/reservations-summary", getUsersReservationsSummary);

// GET /api/users/:id/reservations
router.get("/:id/reservations", getUserReservations);

export default router;
