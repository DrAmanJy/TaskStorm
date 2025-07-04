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
  res.json({ tasks });
};
export const addTasks = async (req, res) => {
  const { title, description, projectId } = req.body;
  const project = await Project.findById(projectId);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }
  if (project.owner.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ message: "Access denied: Only owner can add task" });
  }
  const newTask = await Task.create({
    title,
    description,
    project: project._id,
    createdBy: req.user._id,
  });
  res.status(200).json({ message: "Task created successfully", newTask });
};
export const updateTasks = async (req, res) => {
  const { title, description, projectId, taskId } = req.body;
  const project = await Project.findById(projectId);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }
  if (project.owner.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ message: "Access denied: Only owner can update task" });
  }
  const updatedTask = await Task.findByIdAndDelete(taskId, {
    title,
    description,
  });
  res.status(200).json({ message: "Task updated successfully", updatedTask });
};
export const deleteTasks = async (req, res) => {
  const { taskId, projectId } = req.body;
  const project = await Project.findById(projectId);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }
  if (project.owner.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ message: "Access denied: Only owner can delete task" });
  }
  const deletedTask = await Task.findByIdAndDelete(taskId);
  res.status(200).json({ message: "Task deleted successfully", deletedTask });
};
export const updateStatus = async (req, res) => {
  const { taskId, projectId, status } = req.body;
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
  const updatedTask = await Task.findByIdAndUpdate(taskId, { status });
  res.status(200).json({ message: "Status updated successfully", updatedTask });
};
export const updatePriority = async (req, res) => {
  const { taskId, projectId, priority } = req.body;
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
  const updatedTask = await Task.findByIdAndUpdate(taskId, { priority });
  res
    .status(200)
    .json({ message: "Priority updated successfully", updatedTask });
};
