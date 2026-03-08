import React from "react";
import { FiCheckCircle, FiClock, FiImage, FiEye, } from "react-icons/fi";
import { Link } from "react-router";
import useOrders from "../../../hooks/useOrders";
import { calculateTime } from "../../../utils/calculateTime";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";

const Finished = () => {

  const { orders, isPending } = useOrders()
  if (isPending) return <LoadingSpinner />

  return (
    <div className="space-y-4">

      {orders.map((order, index) => {
        const { orderId, fileCount, priority, createdAt, stageCounts } = order || {}
        const { done } = stageCounts || {}
        const { daysAgo, hoursAgo, minutesAgo } = calculateTime(createdAt)

        const progress = parseFloat((done / fileCount) * 100).toFixed(2)

        return (
          <div
            key={index}
            className={`group w-full flex flex-col sm:flex-row sm:items-center gap-4 px-4 py-4 bg-white border border-gray-200 rounded-md hover:shadow-md hover:-translate-y-0.5 transition-all`}>

            {/* Status indicator + ID */}
            <div className='flex items-center gap-3 min-w-35'>
              {/* animation dot */}
              <div className='relative h-3 w-3'>
                <div className='absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30' />
                <div className='relative h-3 w-3 rounded-full bg-green-600' />
              </div>
              {/* Title */}
              <span className='font-medium text-gray-900 text-[14px]'>
                {orderId}
              </span>
            </div>

            {/* Main content */}
            <div className='flex-1 min-w-0 space-y-2'>
              {/* upper metadata */}
              <div className='flex items-center gap-2 flex-wrap text-xs text-gray-600'>
                <span>
                  created{" "}
                  {daysAgo > 3 ? `${daysAgo}d` :
                    hoursAgo === 0 ? `${minutesAgo}m`
                      : `${hoursAgo}h ${minutesAgo}m`
                  }
                  {" "}ago
                </span>

                <span className='inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 border border-green-300'>
                  Finished
                </span>

                {progress === 100 && (
                  <span className='inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700'>
                    <FiCheckCircle size={13} />
                    Order Complete
                  </span>
                )}

                <span className={`inline-flex items-center rounded  px-2 py-0.5 text-xs font-medium ${priority === 'high' ? "bg-red-50 text-red-700" : priority === 'medium' ? "bg-amber-50 text-amber-700" : "bg-green-500 text-white"}`}>
                  Priority: {priority}
                </span>
              </div>

              {/* progress bar */}
              <div className='w-full bg-gray-200 rounded-full h-2.5 overflow-hidden'>
                <div
                  className='h-2.5 rounded-full bg-green-500 transition-all duration-700'
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Lower metadata */}
              <div className='flex items-center justify-between text-xs text-gray-600 flex-wrap gap-3'>
                <div className='flex items-center gap-5'>
                  <div className='flex items-center gap-1'>
                    <FiClock size={14} />
                    <span>Total files: {fileCount}</span>
                  </div>

                  <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-1 text-green-700'>
                      <FiImage size={14} />
                      <span>Finished {done}</span>
                    </div>
                    {/* if possible calculate total processing time */}
                    {/* <div className='flex items-center gap-1 text-gray-700'>
                        <span>•</span>
                        <span>{order.totalProcessingTime}</span>
                      </div> */}
                  </div>
                </div>

                <div className='font-medium text-green-700'>{progress}%</div>
              </div>
            </div>

            {/* Actions */}
            <div className='flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity md:opacity-80'>
              <Link
                to={`/dashboard/order-details/${encodeURIComponent(orderId)}`}
                className='flex items-center gap-1.5 rounded-lg border border-green-600 px-3 py-1 text-sm font-medium text-green-700 hover:bg-green-50 transition-colors'>
                <FiEye size={16} />
                View Details
              </Link>

            </div>
          </div>
        )
      })

      }
    </div>
  );
};

export default Finished;
