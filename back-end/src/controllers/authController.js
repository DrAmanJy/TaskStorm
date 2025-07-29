import User from "../models/User.js";
import bcrypt from "bcrypt";
import { nodeEnv, jwtSecret } from "../config/env.js";
import jwt from "jsonwebtoken";
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
      sameSite: "None",
      maxAge: 10 * 24 * 60 * 60 * 1000,
      signed: true,
    })
    .status(200)
    .json({
      message: "New user created",
      success: true,
      user: { userName: newUser.userName, userEmail: newUser.userEmail },
    });
};

export const login = async (req, res) => {
  const { userEmail, userPassword } = req.body;

  const user = await User.findOne({ userEmail });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(userPassword, user.userPassword);
  if (!isMatch) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  const token = generateToken(user._id);

  res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "None",
      secure: nodeEnv === "production",
      maxAge: 24 * 60 * 60 * 1000,
      signed: true,
    })
    .status(200)
    .json({
      message: "Login successfully",
      success: true,
      user: { userName: user.userName, userEmail: user.userEmail },
    });
};

export const user = async (req, res) => {
  try {
    const token = req.signedCookies.token;

    if (!token) {
      return res.status(200).json({ user: null });
    }

    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(200).json({ user: null });
    }

    res.status(200).json({
      user: { userName: user.userName, userEmail: user.userEmail },
    });
  } catch (err) {
    return res.status(401).json({ user: null, message: "Invalid token" });
  }
};
