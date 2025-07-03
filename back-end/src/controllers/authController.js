import User from "../models/User.js";
import bcrypt from "bcrypt";
import { nodeEnv } from "../config/env.js";
import { generateToken } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;
  const existingUser = await User.findOne({ userEmail });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(userPassword, 10);
  const newUser = await User.create({
    userName,
    userEmail,
    userPassword: hashedPassword,
  });

  const token = generateToken(newUser._id);
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: nodeEnv === "production",
      sameSite: "strict",
      maxAge: 10 * 24 * 60 * 60 * 1000,
      signed: true,
    })
    .status(200)
    .json({
      message: "new user created",
      user: { userName: newUser.userName, userEmail: newUser.userEmail },
    });
};

export const login = async (req, res) => {
  const { userEmail, userPassword } = req.body;
  const user = await User.findOne({ userEmail });
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  const hashedPassword = await bcrypt.compare(userPassword, user.userPassword);
  if (!hashedPassword) {
    return res.status(401).json({ message: "incorrect password" });
  }
  const token = generateToken(user._id);
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: nodeEnv !== "development",
      sameSite: "strict",
      maxAge: 10 * 24 * 60 * 60 * 1000,
      signed: true,
    })
    .status(200)
    .json({
      message: "Login  successfully",
      user: { userName: user.userName, userEmail: user.userEmail },
    });
};
