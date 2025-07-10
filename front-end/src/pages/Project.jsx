import { EyeIcon, PlusIcon, PencilIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getProjectByIdRequest } from "../services/projectServices";
import CreateProject from "../components/CreateProject";
import { getTasksById } from "../services/taskServices";

const Project = () => {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    getProject();
  }, [id]);
  useEffect(() => {
    const getTasks = async () => {
      const res = await getTasksById(project._id);
      if (res.success) {
        setTasks(res.tasks);
      }
    };
    project && getTasks();
  }, [project]);
  const getProject = async () => {
    const res = await getProjectByIdRequest(id);
    if (res.success) {
      setProject(res.project);
    }
  };
  return (
    project && (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 px-6 py-20">
        <CreateProject
          showProjectForm={showProjectForm}
          setShowProjectForm={setShowProjectForm}
          refreshFunction={getProject}
          update={true}
          project={project}
        />
        <div className="max-w-4xl mx-auto bg-gray-800 p-10 rounded-2xl shadow-2xl">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-cyan-400">
                  {project && project.name}
                </h1>
                <p className="text-gray-300 mt-1 max-w-xl">
                  {project && project.description}
                </p>
              </div>
              <button
                onClick={() => setShowProjectForm(true)}
                href="/update-project"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-cyan-700 text-white font-semibold shadow-md hover:bg-cyan-500 transition-transform hover:scale-105 hover:shadow-cyan-500/50"
              >
                <PencilIcon className="w-4 h-4" /> Edit
              </button>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">Tasks</h2>
              <div className="flex gap-4 items-center">
                <Link
                  to={`/task/create/${project._id}`}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-cyan-700 text-white font-semibold shadow-md hover:bg-cyan-500 transition-transform hover:scale-105 hover:shadow-cyan-500/50"
                >
                  <PlusIcon className="w-4 h-4" /> Add
                </Link>
                <div className="relative">
                  <select className=" bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 pr-10">
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {tasks &&
                tasks.map((task) => (
                  <div
                    key={task._id}
                    className="bg-gray-750 w-full rounded-lg p-6 shadow-md border border-gray-700 hover:border-cyan-500 transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white truncate">
                        {task.title}
                      </h3>
                      <span
                        className={`text-base font-semibold px-3 py-1 rounded-full ${
                          task.status === "pending"
                            ? "bg-yellow-600 text-yellow-100"
                            : task.status === "in-progress"
                            ? "bg-blue-600 text-blue-100"
                            : "bg-green-600 text-green-100"
                        }`}
                      >
                        {task.status.replace("-", " ")}
                      </span>
                    </div>

                    <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          task.progress === 100
                            ? "bg-green-400"
                            : task.progress > 0
                            ? "bg-cyan-400"
                            : "bg-yellow-400"
                        } transition-all duration-300 ease-in-out`}
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between mt-4 text-sm text-gray-300">
                      <div className="flex -space-x-2"></div>
                      <Link
                        to={`/task/${task._id}`}
                        className="inline-flex items-center gap-1 px-4 py-1 rounded-full border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all"
                      >
                        <EyeIcon className="w-4 h-4" /> View
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Project;
