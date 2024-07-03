import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomRequest, User } from "../types/types";

const checkAuthToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, decoded) => {
    if (err) {
      console.error("JWT verification error:", err);
      return res.sendStatus(403); // Forbidden
    }
    req.user = decoded as User;
    next();
  });
};

export default checkAuthToken;
