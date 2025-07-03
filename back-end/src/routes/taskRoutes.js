import express from "express";
import {
  addTasks,
  deleteTasks,
  getTasks,
  updateTasks,
} from "../controllers/taskControllers.js";
import { authorized } from "../middlewares/authMiddleware.js";
const taskRoutes = express.Router();

taskRoutes.get("/:id", authorized, getTasks);
taskRoutes.post("/", authorized, addTasks);
taskRoutes.put("/", authorized, updateTasks);
taskRoutes.delete("/", authorized, deleteTasks);

export default taskRoutes;
