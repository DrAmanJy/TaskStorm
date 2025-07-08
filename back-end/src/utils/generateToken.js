import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/env.js";

export const generateToken = (userId, expiresIn = "1d") => {
  return jwt.sign({ id: userId }, jwtSecret, { expiresIn });
};
