import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
    },
    userEmail: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    userPassword: {
      type: String,
      required: [true, "Password is required"],
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "project",
      },
    ],
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true, versionKey: false }
);
const User = mongoose.model("user", userSchema);
export default User;
