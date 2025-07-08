import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createProjectSchema } from "../schemas/projectSchema";
import { useEffect, useState } from "react";
import { createProject, updateProject } from "../services/projectServices";

const CreateProject = ({
  showProjectForm,
  setShowProjectForm,
  refreshFunction,
  update = false,
  project = {},
}) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(createProjectSchema),
    mode: "onTouched",
    defaultValues: {
      name: project?.name || "",
      description: project?.description || "",
    },
  });

  useEffect(() => {
    if (update && project) {
      reset({
        name: project.name || "",
        description: project.description || "",
      });
    }
  }, [project, update, reset]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = update
        ? await updateProject(data, project._id)
        : await createProject(data);

      if (res.success) {
        alert(update ? "Project updated" : "Project created");
        setShowProjectForm(false);
        refreshFunction();
      } else {
        setError(res.message || "Something went wrong.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`max-h-screen backdrop-blur-md absolute inset-0 z-50 min-h-screen text-gray-100 px-6 pt-40 ${
        !showProjectForm && "hidden"
      }`}
    >
      <div className="max-w-2xl mx-auto bg-gray-800 p-10 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold text-cyan-400 text-center mb-8">
          {update ? "Update Project" : "Create a New Project"}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <label className="block text-gray-300 mb-2 text-sm font-medium">
              Project Name
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="e.g. Marketing Campaign"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-300 mb-2 text-sm font-medium">
              Project Description
            </label>
            <textarea
              {...register("description")}
              placeholder="Briefly describe your project goals, tasks, and structure."
              rows={7}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {errors.description && (
              <p className="text-red-400 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="px-8 mr-5 py-3 rounded-full bg-cyan-700 text-white font-semibold shadow-md hover:bg-cyan-500 transition-transform hover:scale-105"
            >
              {loading
                ? "Loading..."
                : update
                ? "Update Project"
                : "Create Project"}
            </button>

            <button
              type="button"
              onClick={() => setShowProjectForm(false)}
              className="px-8 py-3 rounded-full bg-cyan-700 text-white font-semibold shadow-md hover:bg-cyan-500 transition-transform hover:scale-105"
            >
              Cancel
            </button>
          </div>

          {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
