import express from "express";
import { validateBody } from "../middlewares/validate.js";
import { registerSchema, loginSchema } from "../schemas/authSchemas.js";
import { login, signup } from "../controllers/authController.js";

const authRoutes = express.Router();

authRoutes.post("/signup", validateBody(registerSchema), signup);
authRoutes.post("/login", validateBody(loginSchema), login);

export default authRoutes;
