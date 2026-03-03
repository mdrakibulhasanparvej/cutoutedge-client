import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../hook/useAxiosSecure';
import { OrderContext } from '../context/orderContext';

const OrdersProvider = ({ children }) => {
    const axiosSecure = useAxiosSecure()

    const { isPending, isLoading, data: orders = [] } = useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/files/orders`)
            return res.data.data;
        },
        staleTime: 60000,
    });

    if (isLoading) return <div className="p-4 text-gray-500">Loading orders...</div>;
    if (orders.length === 0) return <div className="p-4 text-gray-500">No active orders found.</div>;

    const ordersInfo = {
        orders,
        isLoading,
        isPending
    }

    return <OrderContext.Provider value={ordersInfo}>{children}</OrderContext.Provider>;
};

export default OrdersProvider;