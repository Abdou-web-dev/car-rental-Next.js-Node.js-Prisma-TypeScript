import CarsService from "../../services/carsService";
import { cars } from "../../data/cars";

const carsService = new CarsService();

describe("CarsService", () => {
  describe("getCarById", () => {
    it("should return the car with the given ID", async () => {
      const car = await carsService.getCarById(1);
      expect(car).toEqual(cars[0]); // Assuming cars[0] has id 1
    });

    it("should return null if the car is not found", async () => {
      const car = await carsService.getCarById(999); // Assuming 999 is not a valid id
      expect(car).toBeNull();
    });
  });

  describe("isCarAvailable", () => {
    it("should return true if the car is available", async () => {
      const isAvailable = await carsService.isCarAvailable(1, new Date("2024-07-01"), new Date("2024-07-05"));
      expect(isAvailable).toBe(true);
    });

    it("should return false if the car is not available", async () => {
      const isAvailable = await carsService.isCarAvailable(1, new Date("2024-07-01"), new Date("2024-07-05"));
      expect(isAvailable).toBe(false);
    });
  });
});
