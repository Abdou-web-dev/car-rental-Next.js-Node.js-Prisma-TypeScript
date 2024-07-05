import { PrismaClient } from "@prisma/client";
import { cars } from "../data/cars";
import { Car } from "../types/types";
const prisma = new PrismaClient();

export default class CarsService {
  // Fetch details of a specific car by its ID.
  async getCarById(carId: number) {
    // Find the car in the static array
    const car = cars?.find((car: Car) => car.id === carId);
    return car || null;
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
