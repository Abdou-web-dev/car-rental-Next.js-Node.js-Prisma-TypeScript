import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomRequest, User } from "../types/types";

const checkAuthToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  try {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!,
      (err: jwt.VerifyErrors | null, user: string | jwt.JwtPayload | undefined) => {
        if (err) {
          throw err;
        }
        req.user = user as User;
        next();
      }
    );
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.sendStatus(403); // Forbidden
  }
};

export default checkAuthToken;
