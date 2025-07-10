import Project from "../models/Project.js";
import Task from "../models/Task.js";
import SubTask from "../models/subTask.js";

export const getTasks = async (req, res, next) => {
  try {
    const { id: projectId } = req.params;
    const userId = req.user._id;

    const project = await Project.findOne({
      _id: projectId,
      $or: [{ owner: userId }, { members: { $in: [userId] } }],
    });

    if (!project) return res.status(403).json({ message: "Access denied" });

    const tasks = await Task.find({ project: projectId }).lean();

    if (!tasks.length) return res.json({ success: true, tasks: null });

    const tasksWithProgress = await Promise.all(
      tasks.map(async (task) => {
        const subTasks = await SubTask.find({ task: task._id });
        const total = subTasks.length;
        const complete = subTasks.filter((s) => s.isCompleted).length;
        const progress = total ? Math.round((complete / total) * 100) : 0;

        return { ...task, progress };
      })
    );

    res.json({ success: true, tasks: tasksWithProgress });
  } catch (err) {
    next(err);
  }
};

export const addTasks = async (req, res, next) => {
  try {
    const { taskName, taskDescription, subtasks } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ message: "Project not found" });

    const userId = req.user._id;
    const authorized =
      project.owner.equals(userId) || project.members.includes(userId);

    if (!authorized) return res.status(403).json({ message: "Access denied" });

    const newTask = await Task.create({
      title: taskName,
      description: taskDescription,
      project: project._id,
      createdBy: userId,
    });

    if (Array.isArray(subtasks)) {
      const createdSubtasks = await SubTask.insertMany(
        subtasks.map((s) => ({
          title: s.title,
          description: s.descriptions,
          priority: s.priority,
          deadline: s.deadline,
          task: newTask._id,
          createdBy: userId,
        }))
      );

      await Task.findByIdAndUpdate(newTask._id, {
        $push: { subTasks: { $each: createdSubtasks.map((s) => s._id) } },
      });
    }

    await Project.findByIdAndUpdate(req.params.id, {
      $push: { tasks: newTask._id },
    });

    res.status(201).json({
      success: true,
      message: "Task and subtasks created successfully",
      newTask,
    });
  } catch (err) {
    next(err);
  }
};

export const updateTasks = async (req, res, next) => {
  try {
    const { title, description, projectId, taskId } = req.body;
    const project = await Project.findById(projectId);

    if (!project) return res.status(404).json({ message: "Project not found" });

    const userId = req.user._id;
    const authorized =
      project.owner.equals(userId) || project.members.includes(userId);

    if (!authorized) return res.status(403).json({ message: "Access denied" });

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description },
      { new: true }
    );

    res.status(200).json({ message: "Task updated successfully", updatedTask });
  } catch (err) {
    next(err);
  }
};

export const deleteTasks = async (req, res, next) => {
  try {
    const { taskId, projectId } = req.body;
    const project = await Project.findById(projectId);

    if (!project) return res.status(404).json({ message: "Project not found" });

    const userId = req.user._id;
    const authorized =
      project.owner.equals(userId) || project.members.includes(userId);

    if (!authorized) return res.status(403).json({ message: "Access denied" });

    const deletedTask = await Task.findByIdAndDelete(taskId);
    res.status(200).json({ message: "Task deleted successfully", deletedTask });
  } catch (err) {
    next(err);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const { taskId, projectId, status } = req.body;
    const userId = req.user._id;

    const project = await Project.findOne({
      _id: projectId,
      $or: [{ owner: userId }, { members: { $in: [userId] } }],
    });

    if (!project) return res.status(403).json({ message: "Access denied" });

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );

    res.status(200).json({
      message: "Status updated successfully",
      updatedTask,
    });
  } catch (err) {
    next(err);
  }
};

export const setTaskCompleted = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const userId = req.user._id;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const project = await Project.findOne({
      _id: task.project,
      $or: [{ owner: userId }, { members: { $in: [userId] } }],
    });

    if (!project) return res.status(403).json({ message: "Access denied" });

    if (task.isCompleted)
      return res.status(400).json({ message: "Task is already completed" });

    task.status = "completed";
    task.isCompleted = true;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task marked as completed",
      task,
    });
  } catch (err) {
    next(err);
  }
};
