import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import DashboardLayout from "../layout/DashboardLayout";
import Statistics from "../pages/Dashboard/common/Statistics";
import DesignOnline from "../pages/Dashboard/DesignWork/DesignOnline";
import ViewDetails from "../pages/Dashboard/DesignWork/ViewDetails";
import Profile from "../pages/Dashboard/common/Profile";
import CreateProject from "../pages/Dashboard/createProject/CreateProject";
import ProjectDetails from "../pages/Dashboard/project-details/ProjectDetails";
import Login from "../pages/Home/Login/Login";
import Register from "../pages/Home/Register/Register";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout />,
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
        path: "view-details",
        element: <ViewDetails />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

export default router;
