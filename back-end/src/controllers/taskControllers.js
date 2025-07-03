import Project from "../models/Project.js";
import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  const projectId = req.params.id;
  const userId = req.user._id;
  const project = await Project.findOne({
    _id: projectId,
    $or: [{ owner: userId }, { members: { $in: [userId] } }],
  });

  if (!project) {
    return res
      .status(403)
      .json({ message: "Access denied: not a member or owner" });
  }
  const tasks = await Task.find({ project: projectId });
  if (tasks.length === 0) {
    return res.status(404).json({ message: "task not found" });
  }
  res.json({ message: "yoyo" });
};
export const addTasks = async (req, res) => {};
export const updateTasks = async (req, res) => {};
export const deleteTasks = async (req, res) => {};
