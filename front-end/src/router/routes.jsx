import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Project from "../pages/Project";
import Task from "../pages/Task";
import CreateTask from "../pages/CreateTask";
import ProtectedRoute from "../components/ProtectedRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "project/:id",
    element: (
      <ProtectedRoute>
        <Project />
      </ProtectedRoute>
    ),
  },
  {
    path: "task/create/:id",
    element: (
      <ProtectedRoute>
        <CreateTask />
      </ProtectedRoute>
    ),
  },
  {
    path: "task/:id",
    element: (
      <ProtectedRoute>
        <Task />
      </ProtectedRoute>
    ),
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
]);

export default routes;
