import { Request, RequestHandler, Response } from "express";
import CarsService from "../services/carsService";
import { validateCars } from "../validation/cars";
import { cars } from "../data/cars";

const carsService = new CarsService();

// GET /api/cars
export const getAllCars = async (req: Request, res: Response) => {
  try {
    const cars = await carsService.getAllCars();
    res.status(200).json(cars);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

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

export const CreateNewCar = async (req: Request, res: Response) => {
  // Validate request body using Joi schema
  const { error } = validateCars(req.body);

  try {
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { make, model, year } = req.body;

    // Create new car using service function
    const newCar = await carsService.createCar(make, model, year);

    // Log success message
    console.log("New car created:", newCar);

    // Return success response
    res.status(201).json(newCar);
  } catch (error) {
    // Log and handle any errors
    console.error("Error creating new car:", error);
    res.status(500).json({ error: "Failed to create new car" });
  }
};

export const CreateCar = async (req: Request, res: Response) => {
  const today = new Date(); // Assuming today's date for availability check

  // Function to check if a car is available based on reservations
  const isCarAvailable = (car: any) => {
    // Check if there are any reservations that overlap with today's date
    const isAvailable = car.reservations.every((reservation: any) => {
      return today < new Date(reservation.startDate) || today > new Date(reservation.endDate);
    });
    return isAvailable;
  };

  // Filter available cars based on the isCarAvailable function
  const availableCars = cars?.filter((car: any) => isCarAvailable(car));

  res.json(availableCars);
  // res.status(200).json({ message: "CreateCar API endpoint controller" });
};

const isCarAvailable = (car: any, startDate: Date, endDate: Date) => {
  return car.reservations.every((reservation: any) => {
    return endDate < new Date(reservation.startDate) || startDate > new Date(reservation.endDate);
  });
};

export const getAvailableCars: RequestHandler = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ message: "Please provide a valid start and end date." });
  }

  const start = new Date(startDate as string);
  const end = new Date(endDate as string);

  const availableCars = cars.filter((car: any) => isCarAvailable(car, start, end));
  res.json(availableCars);
};
