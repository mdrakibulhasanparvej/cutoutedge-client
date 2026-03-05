import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../hook/useAxiosSecure';
import { OrderContext } from '../context/orderContext';
import useUser from '../hook/useUser';
import LoadingSpinner from '../component/Loading/LoadingSpinner';

const OrdersProvider = ({ children }) => {
    const { isLoading: userLoading } = useUser()
    const axiosSecure = useAxiosSecure()

    const { isPending, isLoading, data: orders = [], refetch } = useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/files/orders`)
            return res.data.data;
        },
        staleTime: 60000,
    });

    if (userLoading) return <LoadingSpinner />


    console.log(orders)

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