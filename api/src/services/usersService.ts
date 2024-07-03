import { PrismaClient, Reservation } from "@prisma/client";
const prisma = new PrismaClient();

export default class UsersService {
  // get a list of users with total number of bookings and total duration booked
  async getUsersWithReservationsSummary() {
    try {
      const usersWithSummary = await prisma.user.findMany({
        include: {
          reservations: {
            select: {
              id: true,
              startDate: true,
              endDate: true,
              durationDays: true,
            },
          },
        },
      });

      const usersSummary = usersWithSummary.map((user) => ({
        id: user.id,
        email: user.email,
        totalReservations: user.reservations.length,
        totalDuration: user.reservations.reduce((acc, curr) => acc + curr.durationDays, 0),
      }));

      return usersSummary;
    } catch (error) {
      console.error("Error in getUsersWithReservationsSummary:", error);
      throw new Error("Failed to fetch users with reservations summary");
    }
  }

  //view a User's Reservations
  async getUserReservations(userId: number) {
    try {
      const reservations = await prisma.reservation.findMany({
        where: { userId },
      });
      return reservations;
    } catch (error) {
      console.error(`Error fetching reservations for user ${userId}:`, error);
      throw new Error("Failed to fetch user reservations");
    }
  }
}
