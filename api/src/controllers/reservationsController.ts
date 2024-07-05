import { Request, Response } from "express";
import ReservationsService from "../services/reservationsService";
import { validateReservations } from "../validation/reservations";
// import { PrismaClient } from "@prisma/client";
import { CustomRequest } from "../types/types";
import { cars } from "../data/cars";
import { isCarAvailable } from "./carsController";
// const prisma = new PrismaClient();

const reservationsService = new ReservationsService();

// POST /api/reservations
const createReservation = async (req: CustomRequest, res: Response) => {
  // res.status(200).json({ message: "createReservation API method called" });

  const { error } = validateReservations(req.body); // Validate request body
  const { userId, carId, startDate, endDate } = req.body;

  try {
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    let selectedCarId = carId;

    // Convert string dates to Date objects
    let start, end;
    try {
      start = new Date(startDate);
      end = new Date(endDate);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error("Invalid date format");
      }
    } catch (error) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    if (!carId) {
      console.log("No car id provided, finding an available car...");

      const availableCar = cars?.find((car) => isCarAvailable(car, start, end));
      // new Date(startDate) and new Date(endDate) perform a conversion from the string values received from the frontend to Date objects in JavaScript.

      if (!availableCar) {
        return res.status(404).json({ error: "No available cars for the specified dates." });
      } else {
        selectedCarId = availableCar.id;
      }
    }

    const selectedCar = cars.find((car) => car.id === selectedCarId);

    if (!selectedCar) {
      return res.status(404).json({ error: "Car not found." });
    }

    // Check if the car is available for the specified dates
    if (!isCarAvailable(selectedCar, new Date(startDate), new Date(endDate))) {
      return res.status(400).json({ error: "Car is already booked for the selected dates." });
    }

    const reservation = await reservationsService.createReservation(
      userId,
      selectedCarId,
      new Date(startDate),
      new Date(endDate)
    );

    selectedCar.reservations.push(reservation);

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
