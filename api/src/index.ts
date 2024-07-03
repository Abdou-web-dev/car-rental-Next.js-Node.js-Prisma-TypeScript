import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import morgan from "morgan";
import authRoute from "./routes/authRoute";
import usersRoute from "./routes/usersRoute";
import carsRoute from "./routes/carsRoute";
import reservationsRoute from "./routes/reservationsRoute";

dotenv.config();

const app = express(); //Creates an instance of Express application.
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json()); // Middleware  to parse incoming request bodies as JSON
app.use(morgan("dev")); //morgan will automatically log all HTTP requests with details such as method, URL, status code, and response time.

// Connect to the database
prisma
  .$connect()
  .then(() => {
    console.log("Connected to the database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
  });

// Authentication routes
app.use("/api/auth", authRoute); // Handles user authentication: login and logout
// User management routes
app.use("/api/users", usersRoute); // Manages user operations: registration, profile, updates
// Cars management routes
app.use("/api/cars", carsRoute); // Manages operations related to cars: listing, details, etc.
// Reservations management routes
app.use("/api/reservations", reservationsRoute); // Manages reservations: create, update, list...
