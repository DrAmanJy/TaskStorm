import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "../schemas/taskSchema";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { createTask } from "../services/taskServices";

const CreateTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(taskSchema),
    mode: "onTouched",
    defaultValues: {
      taskName: "",
      taskDescription: "",
      subtasks: [
        {
          title: "",
          descriptions: [""],
          deadline: "",
          priority: "",
        },
      ],
    },
  });

  const { fields: subtaskFields, append: appendSubtask } = useFieldArray({
    control,
    name: "subtasks",
  });

  const subtasks = watch("subtasks");

  const handleAddDescription = (subtaskIndex) => {
    const current = subtasks[subtaskIndex];
    const updated = [...current.descriptions, ""];
    setValue(`subtasks.${subtaskIndex}.descriptions`, updated);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await createTask(data, id);

      if (res.success) {
        alert("Task created");
        navigate(`/project/${id}`);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-20">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-2xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-cyan-400 mb-6">
          Create New Task
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Task Name
            </label>
            <input
              {...register("taskName")}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {errors.taskName && (
              <p className="text-red-400 text-sm">{errors.taskName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Task Description
            </label>
            <textarea
              rows={3}
              {...register("taskDescription")}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {errors.taskDescription && (
              <p className="text-red-400 text-sm">
                {errors.taskDescription.message}
              </p>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-cyan-400">Subtasks</h3>
            {subtaskFields.map((subtask, index) => (
              <div
                key={subtask.id}
                className="p-4 border border-gray-600 rounded-md mb-4"
              >
                <input
                  {...register(`subtasks.${index}.title`)}
                  placeholder="Subtask title"
                  className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
                />
                {errors.subtasks?.[index]?.title && (
                  <p className="text-red-400 text-sm">
                    {errors.subtasks[index].title.message}
                  </p>
                )}

                {subtasks?.[index]?.descriptions?.map((desc, descIndex) => (
                  <input
                    key={descIndex}
                    {...register(`subtasks.${index}.descriptions.${descIndex}`)}
                    placeholder={`Description row ${descIndex + 1}`}
                    className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
                  />
                ))}
                {errors.subtasks?.[index]?.descriptions && (
                  <p className="text-red-400 text-sm">
                    {errors.subtasks[index].descriptions.message}
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => handleAddDescription(index)}
                  className="text-sm text-cyan-400 hover:underline mb-4"
                >
                  + Add another description
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="date"
                    {...register(`subtasks.${index}.deadline`)}
                    className="px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
                  />
                  {errors.subtasks?.[index]?.deadline && (
                    <p className="text-red-400 text-sm">
                      {errors.subtasks[index].deadline.message}
                    </p>
                  )}

                  <select
                    {...register(`subtasks.${index}.priority`)}
                    className="px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
                  >
                    <option value="">Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  {errors.subtasks?.[index]?.priority && (
                    <p className="text-red-400 text-sm">
                      {errors.subtasks[index].priority.message}
                    </p>
                  )}
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                appendSubtask({
                  title: "",
                  descriptions: [""],
                  deadline: "",
                  priority: "",
                })
              }
              className="mt-2 inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full text-sm font-semibold"
            >
              + Add Subtask
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 inline-flex items-center gap-2 bg-cyan-700 hover:bg-cyan-500 text-white px-6 py-2 rounded-full font-semibold transition"
          >
            {loading ? "Loading" : "Create Task"}
          </button>
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
