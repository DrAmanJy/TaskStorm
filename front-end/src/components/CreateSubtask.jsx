import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { subtaskSchema } from "../schemas/subtaskSchema";
import { createSubtask } from "../services/subtaskServices";

const CreateSubtask = ({
  showSubtaskForm,
  setShowSubtaskForm,
  refreshFunction,
  taskId,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(subtaskSchema),
    mode: "onTouched",
    defaultValues: {
      title: "",
      descriptions: [{ value: "" }],
      priority: "",
      deadline: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "descriptions",
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const res = await createSubtask(data, taskId);

      if (res.success) {
        refreshFunction();
        setShowSubtaskForm(false);
      } else {
        setError(res.message || "Failed to create subtask");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showSubtaskForm) {
      reset({
        title: "",
        descriptions: [{ value: "" }],
        priority: "",
        deadline: "",
      });
    }
  }, [showSubtaskForm, reset]);

  return (
    <div
      className={`absolute inset-0 z-50 min-h-screen backdrop-blur-md px-6 pt-40 text-white ${
        !showSubtaskForm && "hidden"
      }`}
    >
      <div className="max-w-2xl mx-auto bg-gray-800 p-10 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-cyan-400 text-center mb-8">
          Create Subtask
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm mb-1">Subtask Title</label>
            <input
              {...register("title")}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600"
              placeholder="Subtask title"
            />
            {errors.title && (
              <p className="text-red-400 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">Descriptions</label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 mb-2">
                <input
                  {...register(`descriptions.${index}.value`)}
                  placeholder={`Description ${index + 1}`}
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => append({ value: "" })}
              className="text-sm text-cyan-400 hover:underline"
            >
              + Add another description
            </button>
            {errors.descriptions && (
              <p className="text-red-400 text-sm mt-1">
                {errors.descriptions.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Deadline</label>
              <input
                type="date"
                {...register("deadline")}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Priority</label>
              <select
                {...register("priority")}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600"
              >
                <option value="">Select Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              {errors.priority && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.priority.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-full bg-cyan-700 hover:bg-cyan-500 transition-transform hover:scale-105"
            >
              {loading ? "Creating..." : "Create Subtask"}
            </button>
            <button
              type="button"
              onClick={() => setShowSubtaskForm(false)}
              className="px-6 py-3 rounded-full bg-cyan-700 hover:bg-cyan-500 transition-transform hover:scale-105"
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

export default CreateSubtask;
