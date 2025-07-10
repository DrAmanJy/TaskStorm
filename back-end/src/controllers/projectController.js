import Project from "../models/Project.js";
import Task from "../models/Task.js";
import User from "../models/User.js";

export const getProject = async (req, res) => {
  const userId = req.user._id;

  const projects = await Project.find({
    $or: [{ owner: userId }, { members: { $in: [userId] } }],
  });

  if (!projects.length) {
    return res.status(404).json({ message: "No projects found" });
  }

  let totalTasks = 0;
  let totalCompleted = 0;

  const enrichedProjects = [];

  for (const project of projects) {
    const tasks = await Task.find({ project: project._id });

    const projectTaskCount = tasks.length;
    const completedTaskCount = tasks.filter((t) => t.isCompleted).length;

    totalTasks += projectTaskCount;
    totalCompleted += completedTaskCount;

    enrichedProjects.push({
      _id: project._id,
      name: project.name,
      description: project.description,
      owner: project.owner,
      members: project.members,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      taskStats: {
        total: projectTaskCount,
        completed: completedTaskCount,
      },
    });
  }

  res.json({
    success: true,
    totalStats: {
      totalTasks,
      totalCompleted,
    },
    projects: enrichedProjects,
  });
};
export const getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    return res.status(404).json({ message: "project not found" });
  }
  res.json({ success: true, project });
};
export const createProject = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user._id;
  const project = await Project.create({ name, description, owner: userId });
  await User.findByIdAndUpdate(userId, { $push: { projects: project._id } });
  res
    .status(200)
    .json({ message: "project successfully  created", success: true, project });
};
export const updateProject = async (req, res) => {
  const { name, description, projectId } = req.body;
  const project = await Project.findById(projectId);
  if (!project) {
    return res.status(404).json({
      message: "Project not found",
    });
  }
  if (project.owner.toString() !== req.user._id.toString()) {
    return res.status(401).json({
      message: "Access denied: not project owner",
    });
  }
  project.$set({ name, description });
  await project.save();
  res
    .status(200)
    .json({ success: true, message: "project successfully updated" });
};
export const deleteProject = async (req, res) => {
  const { projectId } = req.body;
  const project = await Project.findById(projectId.req.body);
  if (!project) {
    return res.status(404).json({
      message: "Project not found",
    });
  }
  if (project.owner.toString() !== req.user._id.toString()) {
    return res.status(401).json({
      message: "Access denied: not project owner",
    });
  }
  await project.deleteOne({ _id: projectId });
  res.status(200).json({ message: "project successfully deleted" });
};
export const getMembers = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    return res.status(404).json({
      message: "Project not found",
    });
  }
  res.json({ members: project.members });
};
export const updateMember = async (req, res) => {
  const { memberId, projectId } = req.body;
  const project = await Project.findById(projectId);
  if (!project) {
    return res.status(404).json({ message: "Project not found." });
  }
  if (project.owner.toString() !== req.user._id.toString()) {
    return res.status(401).json({
      message: "Access denied: not project owner",
    });
  }
  const updatedProject = await Project.findByIdAndUpdate(
    projectId,
    { $addToSet: { members: memberId } },
    { new: true }
  ).populate("members", "userName");
  res.status(200).json({
    message: "Member updated successfully.",
    members: updatedProject.members,
  });
};
export const deleteMember = async (req, res) => {
  const { memberId, projectId } = req.body;

  const project = await Project.findById(projectId);
  if (!project) {
    return res.status(404).json({ message: "Project not found." });
  }
  if (project.owner.toString() !== req.user._id.toString()) {
    return res.status(401).json({
      message: "Access denied: not project owner",
    });
  }

  const updatedProject = await Project.findByIdAndUpdate(
    projectId,
    { $pull: { members: memberId } },
    { new: true }
  ).populate("members", "userName");

  res.status(200).json({
    message: "Member removed successfully.",
    members: updatedProject.members,
  });
};
export const deleteMembers = async (req, res) => {
  const project = await Project.findById(req.body.projectId);
  if (!project) {
    return res.status(404).json({ message: "Project not found." });
  }
  if (project.owner.toString() !== req.user._id.toString()) {
    return res.status(401).json({
      message: "Access denied: not project owner",
    });
  }
  const updatedProject = await Project.findByIdAndUpdate(
    req.body.projectId,
    {
      $set: { members: [] },
    },
    { new: true }
  ).populate("members", "userName");

  res.status(200).json({
    message: "Members removed successfully.",
    members: updatedProject.members,
  });
};
