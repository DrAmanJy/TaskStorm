import { RouterProvider } from "react-router";
import routes from "./router/routes";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <RouterProvider router={routes}></RouterProvider>
    </UserProvider>
  );
}

export default App;
