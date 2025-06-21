import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Auth/Login.jsx";
import Signup from "./pages/Auth/Signup.jsx";
import Homepage from "./pages/Homepage.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Loading from "./components/Loading.jsx";
import Result from "./pages/Dashboard/Result.jsx";
import DashHome from "./pages/Dashboard/DashHome.jsx";
import Account from "./pages/Dashboard/Account.jsx";
import AuthContext from "./context/AuthContext.jsx";
import UserContext from "./context/UserContext.jsx";
import AuthWrapper from "./pages/Auth/AuthWrapper.jsx";
import Logout from "./pages/Auth/Logout.jsx";

const isloading = false;

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/dashboard",
        element: (
          <AuthWrapper>
            <Dashboard />
          </AuthWrapper>
        ),
        children: [
          { path: "/dashboard", element: <DashHome /> },
          {
            path: "/dashboard/result",
            element: isloading ? <Loading /> : <Result />,
          },
          {
            path: "/dashboard/user/",
            element: <Account />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthContext>
    <UserContext>
      <RouterProvider router={routes} />
    </UserContext>
  </AuthContext>
);
