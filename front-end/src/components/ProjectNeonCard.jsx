import { Link } from "react-router";

const ProjectNeonCard = ({ projects }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => {
        return (
          <Link key={project._id} to={`/project/${project._id}`}>
            <div className="bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-cyan-600/30 transition-all">
              <h4 className="text-lg font-semibold text-white mb-2">
                {project.name}
              </h4>
              <p className="text-gray-400 text-sm mb-3">
                25 tasks • 7 completed
              </p>
              <p className="text-cyan-400 hover:underline text-sm">
                View Project
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProjectNeonCard;
