import SubTask from "../models/subTask.js";
import Task from "../models/Task.js";

export const getSubtask = async (req, res) => {
  const taskId = req.params.id;
  const task = await Task.findById(taskId);
  if (!task) {
    return res.status(404).json({ message: "task not found" });
  }
  const subtasks = [];
  let complete = 0;

  for (const element of task.subTasks) {
    const subTask = await SubTask.findById(element);
    subtasks.push(subTask);
    complete += subTask.isCompleted ? 1 : 0;
  }
  const progress = Math.round((complete / task.subTasks.length) * 100);
  res.json({ success: true, progress, subtasks });
};
export const createSubtask = async (req, res) => {
  const { priority, descriptions, title, deadline } = req.body;
  const createdBy = req.user._id;
  const taskId = req.params.id;
  const newSubtask = await SubTask.create({
    createdBy,
    priority,
    description: descriptions,
    title,
    task: taskId,
    deadline,
  });
  await Task.findByIdAndUpdate(
    taskId,
    { $push: { subTasks: newSubtask._id } },
    { new: true }
  );

  res.status(201).json({
    message: "Subtask created successfully",
    success: true,
    subtask: newSubtask,
  });
};
export const updateSubtask = async (req, res) => {
  const { description, title, subtaskId } = req.body;
  const updatedSubtask = await SubTask.findByIdAndUpdate(
    subtaskId,
    { description, title },
    { new: true }
  );

  if (!updatedSubtask) {
    return res.status(404).json({ message: "Subtask not found" });
  }

  res.status(200).json({
    message: "Subtask updated successfully",
    success: true,
    subtask: updatedSubtask,
  });
};
export const updatePriority = async (req, res) => {
  const { priority, subtaskId } = req.body;
  const updatedSubtask = await SubTask.findByIdAndUpdate(
    subtaskId,
    { priority },
    { new: true }
  );

  if (!updatedSubtask) {
    return res.status(404).json({ message: "Subtask not found" });
  }

  res.status(200).json({
    message: "Subtask priority updated successfully",
    success: true,
    subtask: updatedSubtask,
  });
};
export const setCompleted = async (req, res) => {
  const { complete } = req.body;
  const subtaskId = req.params.id;
  console.log(complete);
  const updatedSubtask = await SubTask.findByIdAndUpdate(
    subtaskId,
    { isCompleted: complete },
    { new: true }
  );

  if (!updatedSubtask) {
    return res.status(404).json({ message: "Subtask not found" });
  }

  await Task.findByIdAndUpdate(updatedSubtask.task, { status: "in-progress" });

  res.status(200).json({
    message: "Subtask updated successfully",
    success: true,
    subtask: updatedSubtask,
  });
};
export const getTask = async (req, res) => {
  const taskId = req.params.id;
  const task = await Task.findById(taskId);
  if (!task) {
    return res.status(404).json({ message: "task not found" });
  }
  const subtasks = await SubTask.find({ task: taskId });
  const total = subtasks.length;
  const completed = subtasks.filter((s) => s.isCompleted).length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  res.json({
    success: true,
    task: {
      ...task.toObject(),
      progress,
    },
  });
};
