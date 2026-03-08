import React from 'react';
import { Link } from 'react-router';

const NoOrders = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <p className="text-gray-500 font-medium">No active orders found.</p>

            <Link to="/dashboard/create-project" className="text-blue-500 underline text-sm mt-2">
                Create project
            </Link>
        </div>
    );
};

export default NoOrders;