import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Project from "../pages/Project";
import Task from "../pages/Task";
import CreateTask from "../pages/CreateTask";

const routes = createBrowserRouter([
  {
    path: "",
    element: <Home />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "project/:id",
    element: <Project />,
  },
  {
    path: "task/create/:id",
    element: <CreateTask />,
  },
  {
    path: "task/:id",
    element: <Task />,
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
