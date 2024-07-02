import { Request } from "express";

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

export interface CustomRequest extends Request {
  user: User;
}
