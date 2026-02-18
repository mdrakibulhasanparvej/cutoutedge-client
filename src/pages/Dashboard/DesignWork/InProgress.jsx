import React from "react";
import {
  FiClock,
  FiImage,
  FiLoader,
  FiMoreVertical,
  FiXCircle,
} from "react-icons/fi";

const InProgress = ({
  order = {
    id: "#4568",
    title: "Bundle of product photos",
    startedAt: "12 minutes ago",
    imagesCount: 47,
    processedCount: 28,
    status: "processing",
    priority: "normal",
    progress: 60,
  },
  onPause,
  onCancel,
}) => {
  const progress = Math.min(Math.max(order.progress || 0, 0), 100);
  const isAlmostDone = progress >= 90;

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
      {/* Left */}
      <div className='flex items-center gap-3 min-w-[130px]'>
        <div className='relative h-3 w-3'>
          <div className='absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-30' />
          <div className='relative h-3 w-3 rounded-full bg-blue-600' />
        </div>
        <span className='font-semibold text-gray-900 text-[14px]'>
          {order.id}
        </span>
      </div>

      {/* Main */}
      <div className='flex-1 min-w-0 space-y-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <h3 className='font-medium text-[14px] text-gray-900 truncate max-w-[260px] sm:max-w-full'>
            {order.title}
          </h3>

          <span className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-600 border-blue-300'>
            Processing
          </span>

          {order.priority === "high" && (
            <span className='inline-flex items-center rounded bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700'>
              High Priority
            </span>
          )}
        </div>

        {/* Progress */}
        <div className='w-full bg-gray-200 rounded-full h-2.5 overflow-hidden'>
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              isAlmostDone ? "bg-green-500" : "bg-blue-400"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className='flex flex-wrap items-center justify-between text-xs text-gray-600'>
          <div className='flex flex-wrap items-center gap-4'>
            <div className='flex items-center gap-1'>
              <FiClock size={14} />
              <span>Started {order.startedAt}</span>
            </div>
            <div className='flex items-center gap-1'>
              <FiImage size={14} />
              <span>
                {order.processedCount} / {order.imagesCount}
              </span>
            </div>
          </div>

          <div className='font-semibold'>{progress}%</div>
        </div>
      </div>

      {/* Actions */}
      <div className='flex items-center gap-2 justify-end sm:justify-start'>
        <button
          onClick={onPause}
          className='flex items-center gap-1.5 rounded-lg border border-amber-600 px-4 py-1
            text-sm font-medium text-amber-700 hover:bg-amber-50 transition'>
          <FiLoader size={16} className='animate-spin' />
          Pause
        </button>

        <button
          onClick={onCancel}
          className='flex items-center gap-1.5 rounded-lg border border-red-600 px-4 py-1
            text-sm font-medium text-red-700 hover:bg-red-50 transition'>
          <FiXCircle size={16} />
          Cancel
        </button>

        <button
          className='rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition'
          title='More actions'>
          <FiMoreVertical size={18} />
        </button>
      </div>
    </div>
  );
};

export default InProgress;
