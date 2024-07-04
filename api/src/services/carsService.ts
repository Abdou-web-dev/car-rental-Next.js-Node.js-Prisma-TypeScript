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

  async createCar(make: string, model: string, year: number) {
    try {
      const newCar = await prisma.car.create({
        data: {
          make,
          model,
          year,
        },
      });
      return newCar;
    } catch (error) {
      console.error("Error in createCar:", error);
      throw new Error("Failed to create car");
    }
  }

  // This function checks if there are any existing reservations for the specified carId that overlap with the given startDate and endDate.
  // This functionality ensures that users cannot inadvertently double-book the same car for overlapping dates, thereby maintaining availability integrity.
  async isCarAvailable(carId: number, startDate: Date, endDate: Date) {
    const reservations = await prisma.reservation.findMany({
      where: {
        carId,
        OR: [
          {
            AND: [{ startDate: { lte: startDate } }, { endDate: { gte: startDate } }],
          },
          {
            AND: [{ startDate: { lte: endDate } }, { endDate: { gte: endDate } }],
          },
          {
            AND: [{ startDate: { gte: startDate } }, { endDate: { lte: endDate } }],
          },
        ],
      },
    });

    return reservations.length === 0;
  }
}
