import React from "react";
import {
  FiClock,
  FiDroplet,
  FiImage,
  FiMoreVertical,
} from "react-icons/fi";
import { useQuery } from '@tanstack/react-query';
import useAxios from "../../../hook/useAxios";
import { calculateTime } from "../../../utils/calculateTime";
import Deadline from "../common/deadline";
import { Link } from "react-router";

const Pending = () => {
  const axios = useAxios();

  // const getStatusStyles = (status) => {
  //   switch (status) {
  //     case "pending":
  //       return "bg-amber-100 text-amber-800 border-amber-300";
  //     case "in-progress":
  //       return "bg-blue-100 text-blue-800 border-blue-300";
  //     case "failed":
  //       return "bg-red-100 text-red-800 border-red-300";
  //     case "completed":
  //       return "bg-green-100 text-green-800 border-green-300";
  //     default:
  //       return "bg-gray-100 text-gray-800 border-gray-300";
  //   }
  // };

  // const getDotColor = (status) => {
  //   switch (status) {
  //     case "pending":
  //       return "bg-amber-500";
  //     case "processing":
  //       return "bg-blue-500";
  //     case "failed":
  //       return "bg-red-500";
  //     case "completed":
  //       return "bg-green-500";
  //     default:
  //       return "bg-gray-400";
  //   }
  // };

  const { isPending, data: orders } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await axios.get(`/files/orders`, {
        headers: { "x-user-id": "6997518309071ee6a5465c46" }
      });
      return res.data.data || [];
    },
    staleTime: 60000,
  });

  if (isPending) {
    return <div className="p-4 text-gray-500">Loading orders...</div>;
  }


  return (
    <div className="flex flex-col gap-4">
      {orders.map((order) => {
        const { createdAt, fileCount, orderDeadline, orderId, priority } = order;
        const { minutesAgo, hoursAgo } = calculateTime(createdAt);


        return (
          <div
            key={orderId}
            className='group w-full flex flex-col sm:flex-row sm:items-center gap-4 px-4 py-4 bg-white border border-gray-200 rounded-md hover:shadow-md hover:-translate-y-0.5 transition-all'>

            <div className='flex items-center gap-3 min-w-32.5'>

              <span className='font-semibold text-gray-900 text-[14px]'>
                {orderId}
              </span>
            </div>

            {/* Main content */}
            <div className='flex-1 min-w-0'>
              <div className='flex flex-wrap items-center gap-2'>
                <h1 className="font-medium text-[14px] text-gray-900 truncate max-w-65 sm:max-w-full">Deadline:</h1>
                <h3 className='font-medium text-[14px] text-gray-900 truncate max-w-65 sm:max-w-full'>
                  <Deadline createdAt={createdAt} orderDeadline={orderDeadline} />
                </h3>

              </div>

              <div className='mt-2 flex flex-wrap items-center gap-4 text-xs text-gray-500'>
                <div className='flex items-center gap-1'>
                  <FiClock size={14} />

                  <span>created {hoursAgo === 0 ? `${minutesAgo}m` : `${hoursAgo}h ${minutesAgo}m`} ago</span>
                </div>

                <div className='flex items-center gap-1'>
                  <FiImage size={14} />
                  <span>{fileCount} files</span>
                </div>

                <div className='flex items-center gap-1'>
                  <FiDroplet size={14} />
                  <span>Priority: {priority}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className='flex items-center gap-2 justify-end sm:justify-start'>
              <Link
                to={`/dashboard/order-details/${encodeURIComponent(orderId)}`}
                className='flex items-center gap-1.5 rounded-lg bg-[#0F83B2] px-4 py-1 text-sm font-medium text-white hover:bg-[#0f99cf] duration-500 transition-colors  cursor-pointer'>
                View Details
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Pending;