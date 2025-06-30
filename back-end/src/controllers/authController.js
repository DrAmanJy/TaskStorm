import User from "../models/User.js";
import bcrypt from "bcrypt";
export const signup = async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;
  const user = await User.findOne({ userEmail });
  console.log(user);
  if (user) {
    return res.status(401).json({ message: "user already exists" });
  }
  const hashedPassword = await bcrypt.hash(userPassword, 10);
  const newUser = await User.create({
    userName,
    userEmail,
    userPassword: hashedPassword,
  });
  res.json({
    message: "new user created",
    user: { userName: newUser.userName, userEmail: newUser.userEmail },
  });
};
