import { createBrowserRouter } from "react-router";
import PrivateRoutes from "./PrivateRoutes";
import DashboardLayout from "../layouts/DashboardLayout";
import Statistics from "../dashboard-pages/statistics/Statistics";
import CreateProject from "../dashboard-pages/create-project/CreateProject";
import ProjectDetails from "../components/project-details/ProjectDetails";
import UserManagement from "../dashboard-pages/user-management/UserManagement";
import Login from "../auth/Login/Login";
import Register from "../auth/Register/Register";
import OrdersProvider from "../providers/OrdersProvider";
import Profile from "../dashboard-pages/profile/Profile";
import DesignOnline from "../dashboard-pages/Design-online/DesignOnline";

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
        <OrdersProvider>
          <DashboardLayout />
        </OrdersProvider>
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
      {
        path: "user-management",
        element: <UserManagement />,
      },
    ],
  },
]);

export default router;
