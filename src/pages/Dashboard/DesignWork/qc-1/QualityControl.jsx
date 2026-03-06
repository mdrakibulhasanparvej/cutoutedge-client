import React from "react";
import {
  FiCheckCircle, FiXCircle, FiAlertCircle, FiClock, FiMoreVertical, FiEye, FiImage,
} from "react-icons/fi";
import useOrders from "../../../../hook/useOrders";
import { calculateTime } from "../../../../utils/calculateTime";
import { Link } from "react-router";

const QualityControl = () => {
  const { orders } = useOrders()

  return (
    <div className="space-y-4">
      {orders.map((order, index) => {
        const { createdAt, fileCount, orderId, stageCounts, priority } = order

        const { minutesAgo, hoursAgo, daysAgo } = calculateTime(createdAt);
        const { qc1: onQC1, done, qc2 } = stageCounts || {}

        const progress = parseFloat((done / fileCount) * 100).toFixed(2)
        const isAlmostDone = progress >= 90;

        return (
          <div
            key={index}
            className='group w-full flex flex-col sm:flex-row sm:items-center gap-4 px-4 py-4 bg-white border border-gray-200 rounded-md hover:shadow-md hover:-translate-y-0.5 transition-all'>

            {/* Left */}
            <div className='flex items-center gap-3 min-w-32.5'>
              <span className='font-semibold text-gray-900 text-[14px]'>
                {orderId}
              </span>
            </div>

            {/* Main */}
            <div className='flex-1 min-w-0 space-y-2'>
              <div className='flex flex-wrap items-center gap-2'>
                <h3 className='font-medium text-sm text-gray-500 truncate flex gap-1 items-center'>
                  <FiClock />
                  created{" "}
                  {daysAgo > 3 ? `${daysAgo}d` :
                    hoursAgo === 0 ? `${minutesAgo}m`
                      : `${hoursAgo}h ${minutesAgo}m`
                  }
                  {" "}
                  ago
                </h3>

                <span className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 border-purple-300'>
                  Quality Control
                </span>


                <span className={`inline-flex items-center rounded  px-2 py-0.5 text-xs font-medium ${priority === 'high' ? "bg-red-50 text-red-700" : priority === 'medium' ? "bg-amber-50 text-amber-700" : "bg-green-500 text-white"}`}>
                  Priority: {priority}
                </span>

              </div>

              <div className='w-full bg-gray-200 rounded-full h-2.5 overflow-hidden'>
                <div
                  className={`h-full rounded-full transition-all duration-700 ${isAlmostDone ? "bg-green-500" : "bg-amber-400"}`}
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Meta Info */}
              <div className='flex flex-wrap items-center justify-between text-xs text-gray-600'>
                <div className='flex flex-wrap items-center gap-4'>
                  <div className='flex items-center gap-1'>
                    <FiImage size={14} />
                    <span>{fileCount} Total Files</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <FiImage size={14} />
                    <span>{onQC1} Files in checking</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <FiImage size={14} />
                    <span>{qc2 + done} Files passed QC-1</span>
                  </div>
                </div>
                <div className='font-semibold'>{progress}%</div>
              </div>
            </div>

            {/* Actions */}
            <button className='flex items-center gap-2 justify-end sm:justify-start'>
              <Link
                to={`/dashboard/order-details/${encodeURIComponent(orderId)}`}
                className='flex items-center gap-1.5 rounded-lg bg-[#0F83B2] px-4 py-1 text-sm font-medium text-white hover:bg-[#0f99cf] duration-500 transition-colors  cursor-pointer'>
                <FiEye size={16} />
                View Details
              </Link>
            </button>

          </div>
        )
      })
      }
    </div>
  );
};

export default QualityControl;
