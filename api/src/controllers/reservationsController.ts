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

  try {
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    let { userId, carId, startDate, endDate } = req.body;

    if (!carId) {
      console.log("no card id !");
      const existingCar = await prisma.car.findFirst();
      if (!existingCar) {
        // If no cars exist, create a new car
        const newCar = await prisma.car.create({
          data: {
            model: "test model",
            year: 2020,
            make: "make test",
          },
        });
        console.log(newCar, "newCar during reservation creation process");
        carId = newCar.id;
      } else {
        carId = existingCar.id;
      }
    }

    const reservation = await reservationsService.createReservation(
      userId,
      carId,
      // delete the carId field and try to add a new reservation without the carId !!!
      new Date(startDate),
      new Date(endDate)
    );
    console.log("reservation created successfully : ", reservation);
    res.status(201).json(reservation);
  } catch (error) {
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
