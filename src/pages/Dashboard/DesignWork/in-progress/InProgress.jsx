import React from "react";
import { FiClock, FiImage, FiLoader, FiMoreVertical, FiXCircle } from "react-icons/fi";
import useAxiosSecure from "../../../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { calculateTime } from "../../../../utils/calculateTime";

const InProgress = () => {
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["order", "in-progress"],
    queryFn: async () => {
      const res = await axiosSecure.get('/files/orders');
      return res.data.data;
    }
  });

  if (isLoading) return <div className="p-4 text-gray-500">Loading orders...</div>;
  if (orders.length === 0) return <div className="p-4 text-gray-500">No active orders found.</div>;

  return (
    <div className="space-y-4">
      {orders.map((order) => {

        const { orderId, orderDeadline, fileCount, priority, createdAt, designComplete = 4.5 } = order || {}
        const { hoursAgo, minutesAgo } = calculateTime(createdAt)

        const progress = (designComplete / fileCount) * 100
        const isAlmostDone = progress >= 90;

        return (
          <div
            key={orderId}
            className='group w-full flex flex-col sm:flex-row sm:items-center gap-4 px-4 py-4 bg-white border border-gray-200 rounded-md hover:shadow-md transition-all'
          >
            {/* Left: ID & Status Dot */}
            <div className='flex items-center gap-3 min-w-32.5'>
              <div className='relative h-3 w-3'>
                <div className='absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-30' />
                <div className='relative h-3 w-3 rounded-full bg-blue-600' />
              </div>
              <span className='font-semibold text-gray-900 text-[14px]'>{orderId}</span>
            </div>

            {/* Main: Title & Progress */}
            <div className='flex-1 min-w-0 space-y-2'>
              <div className='flex flex-wrap items-center gap-2'>
                <h3 className='font-medium text-[14px] text-gray-900 truncate max-w-65'>
                  Order for {fileCount} Files
                </h3>

                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${priority === 'high' ? 'bg-red-100 text-red-600 border-red-300' : priority === 'medium' ? "bg-blue-100 text-blue-600 border-blue-300" : "bg-green-100 text-green-600 border-green-300"}`}>
                  {priority.charAt(0).toUpperCase() + order.priority.slice(1)} Priority
                </span>
              </div>

              {/* Progress Bar Container */}
              <div className='w-full bg-gray-200 rounded-full h-2.5 overflow-hidden'>
                <div
                  className={`h-full rounded-full transition-all duration-700 ${isAlmostDone ? "bg-green-500" : "bg-blue-400"}`}
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Meta Info */}
              <div className='flex flex-wrap items-center justify-between text-xs text-gray-600'>
                <div className='flex flex-wrap items-center gap-4'>
                  <div className='flex items-center gap-1'>
                    <FiClock size={14} />
                    <span>created{" "}
                      {hoursAgo === 0
                        ? `${minutesAgo}m`
                        : `${hoursAgo}h ${minutesAgo}m`}{" "}
                      ago</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <FiImage size={14} />
                    <span>{fileCount} Total Files</span>
                  </div>
                </div>
                <div className='font-semibold'>{progress}%</div>
              </div>
            </div>

            {/* Actions */}
            <div className='flex items-center gap-2 justify-end'>
              <button className='flex items-center gap-1.5 rounded-lg border border-amber-600 px-4 py-1 text-sm font-medium text-amber-700 hover:bg-amber-50 transition'>
                <FiLoader size={16} className='animate-spin' />
                Pause
              </button>
              <button className='rounded-lg p-2 text-gray-500 hover:bg-gray-100 transition'>
                <FiMoreVertical size={18} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InProgress;