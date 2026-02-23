import { createBrowserRouter } from "react-router";
import PrivateRoutes from "./PrivateRoutes";
import DashboardLayout from "../layout/DashboardLayout";
import Statistics from "../pages/Dashboard/common/Statistics";
import DesignOnline from '../pages/Dashboard/DesignWork/DesignOnline'
import CreateProject from "../pages/Dashboard/createProject/CreateProject";
import ProjectDetails from "../pages/Dashboard/project-details/ProjectDetails";
import Profile from '../pages/Dashboard/common/Profile'
import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";

const router = createBrowserRouter([
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        element: <Statistics />,
      },
      {
        path: "design-online",
        element: <DesignOnline />,
      },
      {
        path: "create-project",
        element: <CreateProject />,
      },
      {
        path: "order-details/:orderId",
        element: <ProjectDetails />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

export default router;
