import { Request, Response } from "express";
import CarsService from "../services/carsService";
import { validateCars } from "../validation/cars";

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
