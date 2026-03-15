import React from "react";
import { FiClock, FiDroplet, FiEye, FiImage } from "react-icons/fi";
import { Link } from "react-router";
import { calculateTime } from "../../../utils/calculateTime";
import Deadline from "../../../components/shared/timers/Deadline";
import useOrders from "../../../hooks/useOrders";
import NoOrders from "../../../components/Loading/NoOrders";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";

const Pending = () => {
  const { orders, noOrders, isPending } = useOrders();

  if (isPending) return <LoadingSpinner text={"Wait for Orders"} />;
  if (noOrders) return <NoOrders />;

  return (
    <div className='flex flex-col gap-4'>
      {orders?.map((order) => {
        const {
          createdAt,
          fileCount,
          orderDeadline,
          orderId,
          priority,
          stageCounts,
        } = order;
        const { minutesAgo, hoursAgo, daysAgo } = calculateTime(createdAt);

        return (
          <div
            key={orderId}
            className='group w-full flex flex-col sm:flex-row sm:items-center gap-4 px-4 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md hover:shadow-md hover:-translate-y-0.5 transition-all'>
            <div className='flex items-center gap-3 min-w-32.5'>
              <span className='font-semibold text-gray-800 dark:text-gray-100 text-[14px]'>
                {orderId}
              </span>
            </div>

            {/* Main content */}
            <div className='flex-1 min-w-0'>
              <div className='flex flex-wrap items-center gap-2'>
                <h1 className='font-medium text-[14px] text-gray-800 dark:text-gray-100 truncate max-w-65 sm:max-w-full'>
                  Deadline:
                </h1>
                <h3 className='font-medium text-[14px] text-gray-800 dark:text-gray-100 truncate max-w-65 sm:max-w-full'>
                  <Deadline
                    createdAt={createdAt}
                    orderDeadline={orderDeadline}
                  />
                </h3>
              </div>

              <div className='mt-2 flex flex-wrap items-center gap-4 text-xs text-gray-600 dark:text-gray-400'>
                <div className='flex items-center gap-1'>
                  <FiClock size={14} />
                  <span>
                    created{" "}
                    {daysAgo > 3
                      ? `${daysAgo}d`
                      : hoursAgo === 0
                        ? `${minutesAgo}m`
                        : `${hoursAgo}h ${minutesAgo}m`}{" "}
                    ago
                  </span>
                </div>

                <div className='flex items-center gap-1'>
                  <FiImage size={14} />
                  <span>Total Files: {fileCount} </span>
                </div>

                <div className='flex items-center gap-1'>
                  <FiImage size={14} />
                  <span>Pending Files: {stageCounts?.pending} </span>
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
                <FiEye size={16} />
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
