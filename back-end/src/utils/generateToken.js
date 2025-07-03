import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/env.js";

export const generateToken = (userId, expiresIn = "10d") => {
  return jwt.sign({ id: userId }, jwtSecret, { expiresIn });
};
