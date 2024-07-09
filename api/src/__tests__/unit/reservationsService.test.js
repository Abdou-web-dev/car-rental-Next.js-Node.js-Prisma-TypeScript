import ReservationsService from "../../services/reservationsService";

const reservationsService = new ReservationsService();

describe("ReservationsService", () => {
  describe("createReservation", () => {
    it("should create a reservation if the car is available", async () => {
      const reservation = await reservationsService.createReservation(
        1,
        1,
        new Date("2024-07-01"),
        new Date("2024-07-05")
      );
      expect(reservation).toHaveProperty("id");
      expect(reservation).toHaveProperty("userId", 1);
    });

    it("should throw an error if the car is not available", async () => {
      await expect(
        reservationsService.createReservation(1, 1, new Date("2024-07-01"), new Date("2024-07-05"))
      ).rejects.toThrow("Car is already booked for the selected dates.");
    });
  });

  describe("updateReservation", () => {
    it("should update a reservation", async () => {
      const updatedReservation = await reservationsService.updateReservation(1, {
        startDate: new Date("2024-07-10"),
        endDate: new Date("2024-07-15"),
      });
      expect(updatedReservation).toHaveProperty("startDate", new Date("2024-07-10"));
      expect(updatedReservation).toHaveProperty("endDate", new Date("2024-07-15"));
    });
  });
});
