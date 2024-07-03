import { Request } from "express";

export interface User {
  userId: string;
}

export interface CustomRequest extends Request {
  user: User;
}
