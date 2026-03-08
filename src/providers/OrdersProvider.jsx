import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from "../hooks/useAxiosSecure";
import { OrderContext } from '../context/orderContext';
import useUser from "../hooks/useUser";

const OrdersProvider = ({ children }) => {
    const { isLoading: userLoading, userId } = useUser()
    const axiosSecure = useAxiosSecure()

    const { isPending, isLoading, data: orders = [], refetch } = useQuery({
        queryKey: ["orders", userId],
        enabled: !userLoading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/files/orders`)
            return res.data.data;
        },
        staleTime: 60000,
    });


    const noOrders = orders.length === 0

    const ordersInfo = {
        orders,
        noOrders,
        isLoading,
        isPending,
        refetch
    }

    return <OrderContext.Provider value={ordersInfo}>{children}</OrderContext.Provider>;
};

export default OrdersProvider;