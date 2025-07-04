import { RocketIcon, CheckCircle2Icon, UsersIcon } from "lucide-react";
import NeonCard from "../components/NeonCard";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <header className="bg-gray-950 shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between">
          <h1 className="text-2xl font-bold text-cyan-400 ">TaskStorm</h1>
          <nav className="space-x-4 mt-4 sm:mt-0 w-full sm:w-auto text-center">
            <a
              href="#features"
              className="text-gray-300 hover:text-cyan-400 font-medium"
            >
              Features
            </a>
            <a
              href="/login"
              className="text-gray-300 hover:text-cyan-400 font-medium"
            >
              Login
            </a>
            <a
              href="/signup"
              className="inline-block px-5 py-2 mt-2 sm:mt-0 rounded-full font-semibold shadow-md transition-transform bg-cyan-700 text-white border border-transparent hover:scale-105 hover:bg-cyan-500"
            >
              Get Started
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <section className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            Manage Large Projects with Style
          </h2>
          <p className="text-base sm:text-lg text-gray-400 mb-6 max-w-2xl mx-auto">
            TaskStorm helps teams break down big projects into smaller tasks,
            assign members, and stay on track with an elegant, modern UI.
          </p>
          <a
            href="/signup"
            className="inline-block text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold transition-transform bg-cyan-700 text-white hover:scale-105 hover:bg-cyan-500 shadow-md"
          >
            Start Organizing
          </a>
        </section>

        <section
          id="features"
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          <NeonCard>
            <RocketIcon className="h-10 w-10 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-white">
              Create Projects
            </h3>
            <p className="text-gray-300">
              Set up projects quickly and track their progress with clarity.
              From single founders to large teams, TaskStorm adapts to your
              pace.
            </p>
          </NeonCard>

          <NeonCard>
            <UsersIcon className="h-10 w-10 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-white">
              Collaborate with Teams
            </h3>
            <p className="text-gray-300">
              Add members, assign tasks, and keep everyone aligned. Upgrade to a
              subscription plan to unlock role-based access and advanced
              permissions.
            </p>
          </NeonCard>

          <NeonCard>
            <CheckCircle2Icon className="h-10 w-10 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-white">
              Track Tasks & Subtasks
            </h3>
            <p className="text-gray-300">
              Manage tasks and subtasks with precision and mark them complete.
              Get insightful progress analytics with a Pro plan.
            </p>
          </NeonCard>
        </section>
      </main>

      <footer className="bg-gray-950 border-t border-gray-800 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} TaskStorm. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
