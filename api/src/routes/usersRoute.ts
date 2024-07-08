import express, { RequestHandler } from "express";

import { PrismaClient } from "@prisma/client";
import { SignUpHandler, getUserReservations, getUsersReservationsSummary } from "../controllers/usersController";
import { checkAuthToken } from "../middlewares/authenticate";

const prisma = new PrismaClient();
const router = express.Router();

// POST /api/users/signup - User registration
router.post("/signup", SignUpHandler);

// GET /api/users/reservations-summary
router.get(
  "/reservations-summary",
  checkAuthToken as RequestHandler,
  // checkIsAdmin as RequestHandler,
  getUsersReservationsSummary
);
// router.get("/reservations-summary", checkAdmin as RequestHandler, getUsersReservationsSummary);
// checkAdmin is an example of middlware that would be impelmented to grant access to this page ,that points to the backend api endpoint localhost:5000/api/reservations/duration
// to only administrators...
// because it allows for the viewing of reservations' summary of all users combined

// GET /api/users/:id/reservations
router.get("/:id/reservations", checkAuthToken as RequestHandler, getUserReservations);

// By adding checkAuthToken middleware to these routes, I ensure that the user's authentication token (JWT or similar) is validated before allowing access to the reservation data or summary. This helps enforce confidentiality and prevents unauthorized access to sensitive user information.
export default router;
