import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hook/useAuth";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const locations = useLocation();

  if (loading) return <p>Loading ...........</p>;
  if (!user) {
    return <Navigate to='/' state={locations.pathname} />;
  }
  return children;
};

export default PrivateRoutes;