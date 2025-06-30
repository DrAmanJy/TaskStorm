function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl space-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">
          TaskStorm
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          Collaborate, manage, and deliver projects efficiently with your team.
        </p>
        <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-full shadow transition">
          Get Started →
        </button>
      </div>
    </div>
  );
}

export default App;
