import { PrismaClient, Reservation } from "@prisma/client";

const prisma = new PrismaClient();

export default class ReservationsService {
  // Helper function to calculate duration in days
  private calculateDuration(startDate: Date, endDate: Date): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationInMs = end.getTime() - start.getTime();
    return Math.ceil(durationInMs / (1000 * 60 * 60 * 24));
  }

  //create a new reservation
  async createReservation(userId: number, carId: number, startDate: Date, endDate: Date) {
    const durationDays = this.calculateDuration(startDate, endDate);

    const newReservation = await prisma.reservation.create({
      data: {
        userId,
        carId,
        startDate: startDate,
        endDate,
        durationDays,
      },
    });
    return newReservation;
  }

  //Update details of an existing reservation.
  async updateReservation(reservationId: number, newData: Partial<Reservation>) {
    const updatedReservation = await prisma.reservation.update({
      where: { id: reservationId },
      data: newData,
    });
    return updatedReservation;
  }

  //   Retrieve a list of reservations with the duration in days for each reservation.
  async getReservationsWithDuration() {
    const reservationsWithDuration = await prisma.reservation.findMany({
      select: {
        id: true,
        userId: true,
        startDate: true,
        endDate: true,
        durationDays: true,
      },
    });
    return reservationsWithDuration;
  }
}
