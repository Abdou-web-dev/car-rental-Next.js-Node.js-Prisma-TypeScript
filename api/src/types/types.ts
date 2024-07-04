import { Request } from "express";

export interface User {
  id: number;
}

export interface CustomRequest extends Request {
  user: User;
}

export interface Reservation {
  id: number;
  userId: number;
  carId: number;
  startDate: Date;
  endDate: Date;
  durationDays: number;
}

export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  reservations: Reservation[];
}
