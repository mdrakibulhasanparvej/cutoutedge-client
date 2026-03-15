import React from 'react';
import useUser from '../hooks/useUser';
import { Navigate, useLocation } from 'react-router';
import DashboardSkeleton from '../components/Loading/DashboardSkeleton';
import MyAlert from '../components/shared/alerts/MyAlert';

const ActiveUserRoute = ({ children }) => {
    const { status, isLoading } = useUser()
    const location = useLocation();

    if (isLoading) return <DashboardSkeleton />;
    if (status !== 'active') {
        return <Navigate to='/' state={location.pathname} />
    }
    return children;
};

export default ActiveUserRoute;