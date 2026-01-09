import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import DashboardLayout from "../layout/DashboardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />
  }
]);

export default router;
