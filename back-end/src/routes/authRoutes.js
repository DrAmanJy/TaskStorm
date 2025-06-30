import express from "express";
import { validateBody } from "../middlewares/validate.js";
import { registerSchema } from "../schemas/authSchemas.js";
import { signup } from "../controllers/authController.js";

const authRoutes = express.Router();

authRoutes.post("/signup", validateBody(registerSchema), signup);

export default authRoutes;
