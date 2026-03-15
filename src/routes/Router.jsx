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
import InchargeRoute from "./InchargeRoute";
import ActiveUserRoute from "./ActiveUserRoute";

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
        element: <Statistics />
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "design-online",
        element: <ActiveUserRoute>
          <DesignOnline />
        </ActiveUserRoute>,
      },
      {
        path: "order-details/:orderId",
        element: <ActiveUserRoute>
          <ProjectDetails />
        </ActiveUserRoute>,
      },
      {
        path: "create-project",
        element: <InchargeRoute>
          <CreateProject />
        </InchargeRoute>,
      },
      {
        path: "user-management",
        element: <InchargeRoute>
          <UserManagement />
        </InchargeRoute>,
      },
    ],
  },
]);

export default router;
