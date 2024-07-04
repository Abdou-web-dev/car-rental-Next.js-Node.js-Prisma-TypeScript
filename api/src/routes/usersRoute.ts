import express, { RequestHandler } from "express";

import { PrismaClient } from "@prisma/client";
import { SignUpHandler, getUserReservations, getUsersReservationsSummary } from "../controllers/usersController";
import checkAuthToken from "../middlewares/authenticate";

const prisma = new PrismaClient();
const router = express.Router();

// POST /api/users/signup - User registration
router.post("/signup", SignUpHandler);

// By adding checkAuthToken middleware to these routes, I ensure that the user's authentication token (JWT or similar) is validated before allowing access to the reservation data or summary. This helps enforce confidentiality and prevents unauthorized access to sensitive user information.
// GET /api/users/reservations-summary
router.get("/reservations-summary", checkAuthToken as RequestHandler, getUsersReservationsSummary);

// GET /api/users/:id/reservations
router.get("/:id/reservations", checkAuthToken as RequestHandler, getUserReservations);

export default router;
