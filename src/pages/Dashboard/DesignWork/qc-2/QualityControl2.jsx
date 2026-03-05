import React from "react";
import { FiCheckCircle, FiXCircle, FiClock, FiEye } from "react-icons/fi";
import useOrders from "../../../../hook/useOrders";
import LoadingSpinner from "../../../../component/Loading/LoadingSpinner";
import { calculateTime } from "../../../../utils/calculateTime";
import { Link } from "react-router";

const QualityControl2 = () => {

  const { orders, isPending } = useOrders()

  if (isPending) return <LoadingSpinner text={"Wait for orders"} />

  return (
    <div className="space-y-4">

      {orders.map((order, index) => {
        const { orderId, fileCount, priority, createdAt, stageCounts } = order || {}
        const { qc2, done, rejected = 0 } = stageCounts || {}
        const { daysAgo, hoursAgo, minutesAgo } = calculateTime(createdAt)

        const progress = parseFloat((done / fileCount) * 100).toFixed(2)
        const isAlmostDone = progress >= 90

        return (
          <div key={index}
            className='group w-full flex flex-col sm:flex-row sm:items-center gap-4 px-4 py-4 bg-white border border-gray-200 rounded-md hover:shadow-md hover:-translate-y-0.5 transition-all'>

            {/* Left */}
            <div className='flex items-center gap-3 min-w-32.5'>

              {/* animation dot */}
              <div className='relative h-3 w-3'>
                <div className='absolute inset-0 rounded-full bg-red-500 animate-ping opacity-30' />
                <div className='relative h-3 w-3 rounded-full bg-red-600' />
              </div>

              {/* title */}
              <span className='font-semibold text-gray-900 text-[14px]'>
                {orderId}
              </span>
            </div>

            {/* Main */}
            <div className='flex-1 min-w-0 space-y-2'>
              {/* upper metadata */}
              <div className='flex flex-wrap items-center gap-2 text-xs text-gray-600'>
                <span>
                  created{" "}
                  {daysAgo > 3 ? `${daysAgo}d` :
                    hoursAgo === 0 ? `${minutesAgo}m`
                      : `${hoursAgo}h ${minutesAgo}m`
                  }
                  {" "}ago
                </span>

                <span className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-800 border-indigo-300'>
                  QC-2 • Final Review
                </span>

                <span className={`inline-flex items-center rounded  px-2 py-0.5 text-xs font-medium ${priority === 'high' ? "bg-red-50 text-red-700" : priority === 'medium' ? "bg-amber-50 text-amber-700" : "bg-green-500 text-white"}`}>
                  Priority: {priority}
                </span>
              </div>

              {/* Progress bar */}
              <div className='w-full bg-gray-200 rounded-full h-2.5 overflow-hidden'>
                <div
                  className={`h-full rounded-full transition-all duration-700 ${isAlmostDone ? "bg-green-500" : "bg-red-500"}`}
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* lower metadata */}
              <div className='flex flex-wrap items-center justify-between text-xs text-gray-600'>
                <div className='flex flex-wrap items-center gap-4'>
                  <div className='flex items-center gap-1'>
                    <FiClock size={14} />
                    <span>QC-1 Approved: {qc2 + done}</span>
                  </div>

                  <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-1 text-green-700'>
                      <FiCheckCircle size={14} />
                      <span>{done} Completed</span>
                    </div>
                    <div className='flex items-center gap-1 text-red-700'>
                      <FiXCircle size={14} />
                      <span>{rejected} rejected</span>
                    </div>
                  </div>
                </div>

                <div className='font-semibold'>{progress}%</div>
              </div>
            </div>

            {/* Actions */}
            <div className='flex items-center gap-2 justify-end'>
              <Link
                to={`/dashboard/order-details/${encodeURIComponent(orderId)}`}
                className='flex items-center gap-1.5 rounded-lg bg-[#0F83B2] px-4 py-1 text-sm font-medium text-white hover:bg-[#0f99cf] duration-500 transition-colors cursor-pointer'>
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

export default QualityControl2;
