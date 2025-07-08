import { FolderOpen } from "lucide-react";

const NoRecentProjects = ({ setShowProjectForm }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 bg-gray-800 rounded-xl shadow-inner">
      <FolderOpen className="w-12 h-12 text-cyan-400 mb-4" />
      <p className="text-gray-300 text-lg">You have no recent projects.</p>
      <button
        onClick={() => setShowProjectForm(true)}
        className="mt-4 inline-block px-6 py-2 rounded-full font-semibold bg-cyan-700 text-white hover:bg-cyan-500 transition-transform hover:scale-105 shadow-md"
      >
        Create Your First Project
      </button>
    </div>
  );
};

export default NoRecentProjects;
