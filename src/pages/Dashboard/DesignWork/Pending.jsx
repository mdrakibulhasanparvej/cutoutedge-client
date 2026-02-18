import React from "react";
import {
  FiClock,
  FiImage,
  FiPlayCircle,
  FiMoreVertical,
  FiAlertCircle,
} from "react-icons/fi";

const Pending = ({
  order = {
    id: "#4568",
    title: "Bundle of product photos",
    createdAt: "2 hours ago",
    imagesCount: 47,
    status: "pending",
    priority: "normal",
  },
  onStart,
  onView,
  onCancel,
}) => {
  const getStatusStyles = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "failed":
        return "bg-red-100 text-red-800 border-red-300";
      case "completed":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getDotColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-500";
      case "processing":
        return "bg-blue-500";
      case "failed":
        return "bg-red-500";
      case "completed":
        return "bg-green-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div
      className='
        group w-full
        flex flex-col sm:flex-row
        sm:items-center gap-4
        px-4 py-4
        bg-white border border-gray-200 rounded-md
        hover:shadow-md hover:-translate-y-0.5 transition-all
      '>
      {/* Left section */}
      <div className='flex items-center gap-3 min-w-[130px]'>
        <span
          className={`h-2.5 w-2.5 rounded-full ${getDotColor(order.status)}`}
        />
        <span className='font-semibold text-gray-900 text-[14px]'>
          {order.id}
        </span>
      </div>

      {/* Main content */}
      <div className='flex-1 min-w-0'>
        <div className='flex flex-wrap items-center gap-2'>
          <h3 className='font-medium text-[14px] text-gray-900 truncate max-w-[260px] sm:max-w-full'>
            {order.title}
          </h3>

          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusStyles(
              order.status,
            )}`}>
            {order.status}
          </span>

          {order.priority === "high" && (
            <span className='inline-flex items-center rounded bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700'>
              High Priority
            </span>
          )}
        </div>

        <div className='mt-2 flex flex-wrap items-center gap-4 text-xs text-gray-500'>
          <div className='flex items-center gap-1'>
            <FiClock size={14} />
            <span>{order.createdAt}</span>
          </div>
          <div className='flex items-center gap-1'>
            <FiImage size={14} />
            <span>{order.imagesCount} images</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className='flex items-center gap-2 justify-end sm:justify-start'>
        {order.status === "pending" && (
          <button
            onClick={onStart}
            className='flex items-center gap-1.5 rounded-lg bg-[#0F83B2] px-4 py-2 
              text-sm font-medium text-white hover:bg-blue-700 transition cursor-pointer'>
            <FiPlayCircle size={16} />
            View Details
          </button>
        )}

        {order.status === "failed" && (
          <button
            className='flex items-center gap-1.5 rounded-lg border border-red-600 px-4 py-2 
              text-sm font-medium text-red-700 hover:bg-red-50 transition'>
            <FiAlertCircle size={16} />
            Retry
          </button>
        )}

        <button
          className='rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition'
          title='More actions'>
          <FiMoreVertical size={18} />
        </button>
      </div>
    </div>
  );
};

export default Pending;
