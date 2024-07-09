// reservations.test.js

import request from "supertest";
// Other requires and test code
import { app } from "../../index";

describe("Reservations API", () => {
  it("should create a reservation", async () => {
    const res = await request(app).post("/api/reservations").send({
      userId: 1,
      carId: 1,
      startDate: "2024-07-01",
      endDate: "2024-07-05",
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "Reservation created successfully");
  });

  it("should return 400 if car is already booked", async () => {
    const res = await request(app).post("/api/reservations").send({
      userId: 1,
      carId: 1,
      startDate: "2024-07-01",
      endDate: "2024-07-05",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "Car is already booked for the selected dates.");
  });

  it("should update a reservation", async () => {
    const res = await request(app).put("/api/reservations/1").send({
      startDate: "2024-07-10",
      endDate: "2024-07-15",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "reservation updated successfully");
  });
});
