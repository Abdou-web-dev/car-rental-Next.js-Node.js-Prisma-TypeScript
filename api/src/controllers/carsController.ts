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
  return car?.reservations?.every((reservation: Reservation) => {
    return endDate < new Date(reservation.startDate) || startDate > new Date(reservation.endDate);
  });
};

// Context: This function is used to filter through the static array of cars and check if a car is available based on its reservations.
// Data Source: Static array of cars with their reservations.
// Usage: Directly used in the getAvailableCars endpoint to determine which cars are available in the given date range.

export const getAvailableCars: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Please provide a valid start and end date." });
    }

    const start = new Date(startDate as string);
    const end = new Date(endDate as string);

    const availableCars = cars?.filter((car: Car) => isCarAvailable(car, start, end));

    if (!availableCars || availableCars?.length === 0) {
      return res.status(400).json({
        message:
          "There are no available cars at the dates you selected, please choose another time frame and try again",
      });
      // If no cars are available for the specified dates, it returns a 400 Bad Request response with a message indicating that no cars are available. This helps users understand why they aren't seeing any results and what action they should take next.
    } else {
      res.json(availableCars);
      // This part of your code will send a JSON response containing the list of available cars back to the client.
    }
  } catch (error) {
    console.error("Error fetching available cars:", error);
    res.status(500).json({ message: "Failed to fetch available cars. Please try again later." });
  }
};
