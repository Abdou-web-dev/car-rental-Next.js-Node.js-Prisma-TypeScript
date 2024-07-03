import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface UserSummary {
  id: string;
  email: string;
  totalReservations: number;
  totalDuration: number;
}

export default class UsersService {
  // get a list of users with total number of bookings and total duration booked
  async getUsersWithReservationsSummary() {
    try {
      const usersWithSummary: UserSummary[] = await prisma.$queryRaw`
        SELECT 
            u.id::text as id,
            u.email,
            COUNT(r.id) AS "totalReservations",
            COALESCE(SUM(r."durationDays"), 0) AS "totalDuration"
        FROM 
            "User" u
        LEFT JOIN 
            "Reservation" r ON u.id = r."userId"
        GROUP BY 
            u.id, u.email
      `;

      const usersSummary = usersWithSummary.map((user) => ({
        id: user.id.toString(), // Convert id to string explicitly
        email: user.email,
        totalReservations: Number(user.totalReservations),
        totalDuration: Number(user.totalDuration),
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
