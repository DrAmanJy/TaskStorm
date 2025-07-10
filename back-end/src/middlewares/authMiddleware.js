import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/env.js";
import User from "../models/User.js";
export const authorized = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Please login" });
  }
  const decoded = jwt.verify(token, jwtSecret);
  const user = await User.findById(decoded.id);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized: Invalid user" });
  }

  req.user = user;
  next();
};
