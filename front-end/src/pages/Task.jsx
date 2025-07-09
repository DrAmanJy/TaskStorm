import {
  CheckCircle2,
  AlarmClock,
  CalendarDays,
  Info,
  PlusCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  getSubtasksById,
  getTaskById,
  setCompleted,
} from "../services/subtaskServices";

const Task = () => {
  const [subtasks, setSubtask] = useState(null);
  const [progress, setProgress] = useState(0);
  const [task, setProject] = useState(0);
  const { id } = useParams();
  console.log(task);
  useEffect(() => {
    getSubtasks();
    getProject();
  }, [id]);
  const getSubtasks = async () => {
    const res = await getSubtasksById(id);
    if (res.success) {
      setSubtask(res.subtasks);
      setProgress(res.progress);
    } else {
      console.log(res.message);
    }
  };
  const getProject = async () => {
    const res = await getTaskById(id);
    if (res.success) {
      setProject(res.task);
    } else {
      console.log(res.message);
    }
  };

  const handleComplete = async (completed, id) => {
    console.log(completed, id);
    const res = await setCompleted(completed, id);
    if (res.success) {
      alert(res.message);
      getSubtasks();
      getProject();
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-20">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-2xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">{task.title}</h2>

        <div className="mb-6">
          <p className="text-gray-300">{task.description}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-300">Progress</span>
            <span className="text-sm text-gray-400">{progress}%</span>
          </div>
          <div className="w-full bg-gray-700 h-2 rounded-full">
            <div
              className="h-2 rounded-full bg-cyan-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Priority Filter UI */}
        <div className="mb-6">
          <label
            htmlFor="priorityFilter"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Filter by Priority
          </label>
          <select
            id="priorityFilter"
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">Subtasks</h3>
          <button className="inline-flex items-center gap-2 bg-cyan-700 hover:bg-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold transition">
            <PlusCircle className="w-4 h-4" /> Add Subtask
          </button>
        </div>

        <ul className="space-y-4">
          {subtasks &&
            subtasks.map((sub) => (
              <li
                key={sub._id}
                className="bg-gray-700 p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-base font-medium ${
                      sub.isCompleted
                        ? "line-through text-green-400"
                        : "text-white"
                    }`}
                  >
                    {sub.title}
                  </span>
                  <button
                    onClick={() => handleComplete(true, sub._id)}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      sub.isCompleted
                        ? "bg-green-600 text-white cursor-default"
                        : "bg-cyan-700 hover:bg-cyan-500 text-white transition"
                    }`}
                    disabled={sub.isCompleted}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-1" />{" "}
                    {sub.isCompleted ? "Completed" : "Mark Complete"}
                  </button>
                </div>
                {sub.description.map((description, i) => {
                  return (
                    <div
                      key={i}
                      className="text-sm text-gray-300 mb-1 flex items-start"
                    >
                      <Info className="w-4 h-4 mt-0.5 mr-2 text-cyan-400" />
                      <p>{description}</p>
                    </div>
                  );
                })}
                <div className="flex items-center text-xs text-gray-400 gap-4 mt-1">
                  <p>
                    <CalendarDays className="inline w-4 h-4 mr-1" /> Created:
                    {""}
                    {new Date(sub.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                    })}
                  </p>
                  <p>
                    <AlarmClock className="inline w-4 h-4 mr-1" /> Deadline:{""}
                    {new Date(sub.deadline).toLocaleString("en-IN", {
                      dateStyle: "medium",
                    })}
                  </p>
                  <p className="text-yellow-300">Priority: {sub.priority}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Task;
