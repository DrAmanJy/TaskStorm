import express from "express";
import {
  addTasks,
  deleteTasks,
  getTasks,
  updateStatus,
  updateTasks,
} from "../controllers/taskControllers.js";
import { authorized } from "../middlewares/authMiddleware.js";
const taskRoutes = express.Router();

taskRoutes.get("/:id", authorized, getTasks);
taskRoutes.post("/:id", authorized, addTasks);
taskRoutes.put("/", authorized, updateTasks);
taskRoutes.delete("/", authorized, deleteTasks);
taskRoutes.put("/status", authorized, updateStatus);

export default taskRoutes;
