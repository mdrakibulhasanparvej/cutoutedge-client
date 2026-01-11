import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import DashboardLayout from "../layout/DashboardLayout";
import Statistics from "../pages/Dashboard/common/Statistics";
import DesignOnline from "../pages/Dashboard/DesignWork/DesignOnline";
import ViewDetails from "../pages/Dashboard/DesignWork/ViewDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
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
        path: "viewdetails",
        element: <ViewDetails />,
      },
    ],
  },
]);

export default router;
