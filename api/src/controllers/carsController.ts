import { Request, RequestHandler, Response } from "express";
import CarsService from "../services/carsService";
import { cars } from "../data/cars";
import { Car, Reservation } from "../types/types";

const carsService = new CarsService();

// GET /api/cars/:id
export const getCarById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const car = await carsService.getCarById(parseInt(id, 10));
    if (!car) {
      return res.status(404).json({ message: `Car with id ${id} not found` });
    }
    res.status(200).json(car);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const isCarAvailable = (car: Car, startDate: Date, endDate: Date) => {
  return car.reservations.every((reservation: Reservation) => {
    return endDate < new Date(reservation.startDate) || startDate > new Date(reservation.endDate);
  });
};

// Context: This function is used to filter through the static array of cars and check if a car is available based on its reservations.
// Data Source: Static array of cars with their reservations.
// Usage: Directly used in the getAvailableCars endpoint to determine which cars are available in the given date range.
export const getAvailableCars: RequestHandler = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ message: "Please provide a valid start and end date." });
  }

  const start = new Date(startDate as string);
  const end = new Date(endDate as string);

  const availableCars = cars?.filter((car: any) => isCarAvailable(car, start, end));
  res.json(availableCars);
};
