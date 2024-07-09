import express, { Request, RequestHandler, Response } from "express";
import {
  createReservation,
  getReservationsWithDuration,
  updateReservation,
} from "../controllers/reservationsController";
import { checkAuthToken } from "../middlewares/authenticate";

// Initialize Express router
const router = express.Router();

// GET /api/reservations/duration - Get reservations with duration
// @ts-ignore
// router.get("/duration",checkAdmin, getReservationsWithDuration);
router.get(
  "/duration",
  checkAuthToken as RequestHandler,
  //  checkIsAdmin as RequestHandler,
  getReservationsWithDuration
);
// checkAdmin is an example of middlware that would be impelmented to grant access to this page ,that points to the backend api endpoint localhost:5000/api/reservations/duration
// to only administrators...
// because it allows for the viewing of reservations of all users combined

// PUT /api/reservations/:id
router.put("/:id", checkAuthToken as RequestHandler, updateReservation);

// POST /api/reservations - Create a new reservation
// @ts-ignore
router.post("/", checkAuthToken as RequestHandler, createReservation);

// GET /api/reservations/users/:id - Get reservations by user ID
// router.get('/users/:id', );

export default router;
