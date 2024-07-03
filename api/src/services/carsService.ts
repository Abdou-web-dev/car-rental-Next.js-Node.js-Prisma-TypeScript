import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class CarsService {
  // Retrieve a list of all available cars.
  //   Typically, fetching all cars means retrieving all cars available in the system, regardless of which user is logged in.
  async getAllCars() {
    const cars = await prisma.car.findMany();
    return cars;
  }
  // Fetch details of a specific car by its ID.
  async getCarById(carId: number) {
    const car = await prisma.car.findUnique({
      where: { id: carId },
    });
    return car;
  }
}
