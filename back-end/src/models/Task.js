import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "in-progress", "done"],
      default: "pending",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },

    dueDate: {
      type: Date,
      default: null,
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: null,
    },

    subTasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "task",
      },
    ],

    parentTask: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "task",
      default: null,
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

taskSchema.index({ project: 1 });

const Task = mongoose.model("task", taskSchema);

export default Task;
