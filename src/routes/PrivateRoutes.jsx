import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hook/useAuth";
import DashboardSkeleton from "../component/Loading/DashboardSkeleton";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const locations = useLocation();

  if (loading) return <DashboardSkeleton />;
  if (!user) {
    return <Navigate to='/' state={locations.pathname} />;
  }
  return children;
};

export default PrivateRoutes;