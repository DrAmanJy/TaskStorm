import {
  CheckCircle2,
  AlarmClock,
  CalendarDays,
  Info,
  PlusCircle,
} from "lucide-react";

const Task = () => {
  const subtasks = [
    {
      title: "Wireframe hero section",
      description: "Create basic layout for hero section.",
      deadline: "2025-07-10",
      priority: "High",
      created: "2025-07-01",
      done: true,
    },
    {
      title: "Write header copy",
      description:
        "Draft compelling headline and subtext.Draft compelling headline and subtext.Draft compelling headline and subtext.Draft compelling headline and subtext.Draft compelling headline and subtext.Draft compelling headline and subtext.Draft compelling headline and subtext.Draft compelling headline and subtext.Draft compelling headline and subtext.",
      deadline: "2025-07-12",
      priority: "Medium",
      created: "2025-07-03",
      done: false,
    },
    {
      title: "Choose stock images",
      description: "Pick high-quality visuals that match brand.",
      deadline: "2025-07-14",
      priority: "Low",
      created: "2025-07-04",
      done: false,
    },
    {
      title: "Mobile responsiveness",
      description: "Ensure layout works well on small screens.",
      deadline: "2025-07-15",
      priority: "High",
      created: "2025-07-04",
      done: false,
    },
  ];
  const completedCount = subtasks.filter((s) => s.done).length;
  const progressPercent = Math.round((completedCount / subtasks.length) * 100);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-20">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-2xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">
          Task: Design Landing Page
        </h2>

        <div className="mb-6">
          <p className="text-gray-300">
            This task includes building the structure, visuals, and content for
            the landing page. Ensure it meets brand guidelines and works across
            devices.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-300">Progress</span>
            <span className="text-sm text-gray-400">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-700 h-2 rounded-full">
            <div
              className="h-2 rounded-full bg-cyan-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
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
          {subtasks.map((sub, index) => (
            <li key={index} className="bg-gray-700 p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-base font-medium ${
                    sub.done ? "line-through text-green-400" : "text-white"
                  }`}
                >
                  {sub.title}
                </span>
                <button
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    sub.done
                      ? "bg-green-600 text-white cursor-default"
                      : "bg-cyan-700 hover:bg-cyan-500 text-white transition"
                  }`}
                  disabled={sub.done}
                >
                  <CheckCircle2 className="w-4 h-4 mr-1" />{" "}
                  {sub.done ? "Completed" : "Mark Complete"}
                </button>
              </div>
              <div className="text-sm text-gray-300 mb-2 flex items-start">
                <Info className="w-4 h-4 mt-0.5 mr-2 text-cyan-400" />
                <p>{sub.description}</p>
              </div>
              <div className="flex items-center text-xs text-gray-400 gap-4 mt-1">
                <p>
                  <CalendarDays className="inline w-4 h-4 mr-1" /> Created:{" "}
                  {sub.created}
                </p>
                <p>
                  <AlarmClock className="inline w-4 h-4 mr-1" /> Deadline:{" "}
                  {sub.deadline}
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
