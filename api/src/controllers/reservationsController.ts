import { Request, Response } from "express";
import ReservationsService from "../services/reservationsService";
import { validateReservations } from "../validation/reservations";
import { PrismaClient } from "@prisma/client";
import { CustomRequest } from "../types/types";
const prisma = new PrismaClient();

const reservationsService = new ReservationsService();

// POST /api/reservations
const createReservation = async (req: CustomRequest, res: Response) => {
  const { error } = validateReservations(req.body); // Validate request body
  const { userId, carId, startDate, endDate } = req.body;

  try {
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    let selectedCarId = carId;

    if (!carId) {
      console.log("No car id provided, finding an available car...");

      const availableCar = await prisma.car.findFirst({
        where: {
          // conditions to check car availability within the specified date range
          reservations: {
            none: {
              OR: [
                {
                  startDate: { lte: new Date(endDate) },
                  endDate: { gte: new Date(startDate) },
                },
                {
                  startDate: { gte: new Date(startDate) },
                  endDate: { lte: new Date(endDate) },
                },
              ],
            },
          },
        },
      });

      if (!availableCar) {
        return res.status(404).json({ error: "No available cars for the specified dates." });
      } else {
        selectedCarId = availableCar.id;
      }
    }

    const reservation = await reservationsService.createReservation(
      userId,
      selectedCarId,
      new Date(startDate),
      new Date(endDate)
    );

    console.log("Reservation created successfully:", reservation);
    res.status(201).json(reservation);
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ error: "An error occurred while creating the reservation." });
  }
};

// PUT /api/reservations/:id
const updateReservation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { startDate, endDate } = req.body;
  try {
    const updatedReservation = await reservationsService.updateReservation(parseInt(id, 10), {
      // carId,
      startDate,
      endDate,
    });
    res.status(200).json(updatedReservation);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/reservations/duration
const getReservationsWithDuration = async (req: Request, res: Response) => {
  try {
    const reservationsWithDuration = await reservationsService.getReservationsWithDuration();
    res.status(200).json(reservationsWithDuration);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export { createReservation, updateReservation, getReservationsWithDuration };
