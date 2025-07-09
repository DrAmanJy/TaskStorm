import express from "express";
import {
  createSubtask,
  getSubtask,
  getTask,
  setCompleted,
  updatePriority,
  updateSubtask,
} from "../controllers/subTaskController.js";
import { authorized } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.get("/:id", authorized, getSubtask);
router.post("/:id", authorized, createSubtask);
router.put("/:id", authorized, updateSubtask);
router.put("/priority/:id", authorized, updatePriority);
router.put("/complete/:id", authorized, setCompleted);
router.get("/task/:id", authorized, getTask);
export default router;
