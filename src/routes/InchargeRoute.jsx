import React from 'react';
import { Navigate, useLocation } from 'react-router';
import DashboardSkeleton from '../components/Loading/DashboardSkeleton';
import useUser from '../hooks/useUser';

const InchargeRoute = ({ children }) => {
    const { role, isLoading } = useUser()
    const location = useLocation();

    if (isLoading) return <DashboardSkeleton />;
    if (role !== 'incharge') {
        return <Navigate to='/' state={location.pathname} />;
    }
    return children;
};

export default InchargeRoute;