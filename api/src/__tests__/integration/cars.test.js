import request from "supertest";
// Other requires and test code
import { app } from "../../index";

describe("Cars API", () => {
  it("should get a car by ID", async () => {
    const res = await request(app).get("/api/cars/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
  });

  it("should return 404 if car is not found", async () => {
    const res = await request(app).get("/api/cars/999");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Car with id 999 not found");
  });

  it("should get available cars", async () => {
    const res = await request(app).get("/api/cars").query({ startDate: "2024-07-01", endDate: "2024-07-05" });
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
