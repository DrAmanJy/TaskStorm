import { PlusCircle, FolderOpen } from "lucide-react";

import ProjectNeonCard from "../components/ProjectNeonCard";
import { useEffect, useState } from "react";
import CreateProject from "../components/CreateProject";
import DashboardInfoCards from "../components/DashboardInfoCards";
import NoRecentProjects from "../components/NoRecentProjects";
import { getProjectRequest } from "../services/projectServices";

const Dashboard = () => {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [project, setProject] = useState(null);
  const [totalStats, setTotalStats] = useState(null);
  const getProjects = async () => {
    try {
      const data = await getProjectRequest();
      if (data.success) {
        setProject(data.projects);
        setTotalStats(data.totalStats);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Project fetch failed:", err.message);
    }
  };
  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div
      className={`${
        showProjectForm ? "h-screen overflow-hidden" : "min-h-screen"
      } bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 px-6 py-12`}
    >
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold text-cyan-400">Welcome Back!</h1>
            <p className="text-gray-400 mt-1">
              Here’s a snapshot of your projects and progress.
            </p>
          </div>
          <button
            onClick={() => setShowProjectForm(true)}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full font-semibold bg-cyan-700 text-white shadow-md hover:bg-cyan-500 transition-all duration-200 hover:scale-105"
          >
            <PlusCircle className="w-5 h-5" />
            New Project
          </button>
        </header>
        <CreateProject
          refreshFunction={getProjects}
          showProjectForm={showProjectForm}
          setShowProjectForm={setShowProjectForm}
        />

        {totalStats && (
          <DashboardInfoCards
            project={project?.length || 0}
            setShowProjectForm={setShowProjectForm}
            totalTasks={totalStats.totalTasks}
            totalCompleted={totalStats.totalCompleted}
          />
        )}

        <section className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-6">
            Recent Projects
          </h3>

          {project ? (
            <ProjectNeonCard projects={project} />
          ) : (
            <NoRecentProjects setShowProjectForm={setShowProjectForm} />
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
