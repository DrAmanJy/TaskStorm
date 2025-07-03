import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Project must have an owner"],
    },

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],

    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "team",
      default: null,
    },

    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "task",
      },
    ],

    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("project", projectSchema);

export default Project;
