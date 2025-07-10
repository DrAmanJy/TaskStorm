import { FolderPlus, LayoutDashboard, CircleCheckBig } from "lucide-react";
import NeonCard from "./NeonCard";
const DashboardInfoCards = ({
  setShowProjectForm,
  project,
  totalCompleted,
  totalTasks,
}) => {
  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <NeonCard>
        <LayoutDashboard className="mx-auto mb-4 h-10 w-10 text-cyan-400" />
        <h2 className="text-xl font-semibold text-white">Projects Overview</h2>
        <p className="text-gray-400 mt-2">
          You have{" "}
          <span className="text-cyan-400 font-semibold">{project}</span> active
          projects.
        </p>
      </NeonCard>

      <NeonCard>
        <CircleCheckBig className="mx-auto mb-4 h-10 w-10 text-cyan-400" />
        <h2 className="text-xl font-semibold text-white">Task Progress</h2>
        <p className="text-gray-400 mt-2">
          {totalCompleted} of {totalTasks} tasks completed.
        </p>
      </NeonCard>
      <button onClick={() => setShowProjectForm(true)}>
        <NeonCard>
          <FolderPlus className="mx-auto mb-4 h-10 w-10 text-cyan-400" />
          <h2 className="text-xl font-semibold text-white">
            Start Something New
          </h2>
          <p className="text-gray-400 mt-2">
            Create your next big project and start organizing your team.
          </p>
        </NeonCard>
      </button>
    </section>
  );
};

export default DashboardInfoCards;
