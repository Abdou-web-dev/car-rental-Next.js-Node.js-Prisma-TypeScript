import { Request } from "express";

export interface User {
  id: number;
}

export interface CustomRequest extends Request {
  user: User;
}
