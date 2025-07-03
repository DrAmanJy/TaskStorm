import express from "express";
import {
  createProject,
  deleteMember,
  deleteMembers,
  deleteProject,
  getMembers,
  getProject,
  updateMember,
  updateProject,
} from "../controllers/projectController.js";
import { authorized } from "../middlewares/authMiddleware.js";
const projectRouter = express.Router();

projectRouter.get("/", authorized, getProject);
projectRouter.post("/", authorized, createProject);
projectRouter.put("/", authorized, updateProject);
projectRouter.delete("/", authorized, deleteProject);
projectRouter.get("/members/:id", authorized, getMembers);
projectRouter.put("/members", authorized, updateMember);
projectRouter.delete("/members", authorized, deleteMembers);
projectRouter.delete("/member", authorized, deleteMember);

export default projectRouter;
