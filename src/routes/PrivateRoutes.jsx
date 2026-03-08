import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import DashboardSkeleton from "../components/Loading/DashboardSkeleton";

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