import { Request, Response } from "express";
import CarsService from "../services/carsService";

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
