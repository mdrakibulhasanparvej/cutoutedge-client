import React, { useContext } from 'react';
import { OrderContext } from '../context/orderContext';

const useOrders = () => {
    const ordersInfo = useContext(OrderContext)
    return ordersInfo
};

export default useOrders;