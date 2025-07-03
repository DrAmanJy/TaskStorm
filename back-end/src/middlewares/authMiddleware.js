import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/env.js";
import User from "../models/User.js";
export const authorized = async (req, res, next) => {
  if (!req.signedCookies.token) {
    return res.status(401).json({ message: "Unauthorized: Please login" });
  }
  const token = jwt.verify(req.signedCookies.token, jwtSecret);
  const user = await User.findById(token.id);
  if (!user) {
    return res.status(404).json({ message: "Token invalid: user not found" });
  }
  req.user = user;
  next();
};
