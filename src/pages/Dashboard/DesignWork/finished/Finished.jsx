import React from "react";
import {
  FiCheckCircle,
  FiClock,
  FiImage,
  FiMoreVertical,
  FiDownload,
  FiExternalLink,
} from "react-icons/fi";
import { Link } from "react-router";

const Finished = ({
  order = {
    id: "#4568",
    title: "Bundle of product photos",
    finishedAt: "Just now",
    imagesCount: 47,
    approvedCount: 47,
    totalProcessingTime: "14m 32s",
    status: "completed",
    priority: "normal",
    outputUrl: "#", // link to download / view final result
  },
  onDownload,
  onViewDetails,
}) => {
  const allApproved = order.approvedCount === order.imagesCount;

  return (
    <div
      className={`
        roup w-full
        flex flex-col sm:flex-row
        sm:items-center gap-4
        px-4 py-4
        bg-white border border-gray-200 rounded-md
        hover:shadow-md hover:-translate-y-0.5 transition-all
      `}>
      {/* Status indicator + ID */}
      <div className='flex items-center gap-3 min-w-35'>
        <div className='h-2.5 w-2.5 rounded-full bg-green-500' />
        <span className='font-medium text-gray-900 text-[14px]'>
          {order.id}
        </span>
      </div>

      {/* Main content */}
      <div className='flex-1 min-w-0 space-y-2'>
        <div className='flex items-center gap-2 flex-wrap'>
          <h3 className='font-medium text-[14px] text-gray-900 truncate'>
            {order.title}
          </h3>

          <span
            className='
            inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
            bg-green-100 text-green-800 border border-green-300
          '>
            Completed
          </span>

          {allApproved && (
            <span className='inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700'>
              <FiCheckCircle size={13} />
              100% Approved
            </span>
          )}

          {order.priority === "high" && (
            <span className='inline-flex items-center rounded bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700'>
              High Priority
            </span>
          )}
        </div>

        {/* Success indicator bar (full green) */}
        <div className='w-full bg-gray-200 rounded-full h-2.5 overflow-hidden'>
          <div
            className='h-2.5 rounded-full bg-green-500 transition-all duration-700'
            style={{ width: "100%" }}
          />
        </div>

        <div className='flex items-center justify-between text-xs text-gray-600 flex-wrap gap-3'>
          <div className='flex items-center gap-5'>
            <div className='flex items-center gap-1'>
              <FiClock size={14} />
              <span>Finished {order.finishedAt}</span>
            </div>

            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-1 text-green-700'>
                <FiImage size={14} />
                <span>{order.imagesCount} images</span>
              </div>
              <div className='flex items-center gap-1 text-gray-700'>
                <span>•</span>
                <span>{order.totalProcessingTime}</span>
              </div>
            </div>
          </div>

          <div className='font-medium text-green-700'>Success</div>
        </div>
      </div>

      {/* Actions */}
      <div className='flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity md:opacity-80'>
        <button
          onClick={onDownload}
          className='flex items-center gap-1.5 rounded-lg bg-green-600 px-3.5 py-1
                   text-sm font-medium text-white hover:bg-green-700 transition-colors'>
          <FiDownload size={16} />
          Download
        </button>

        <Link
          to='/dashboard/view-details'
          onClick={onViewDetails}
          className='flex items-center gap-1.5 rounded-lg border border-green-600 px-3.5 py-1
                   text-sm font-medium text-green-700 hover:bg-green-50 transition-colors'>
          <FiExternalLink size={16} />
          View Details
        </Link>

        <button
          className='rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors'
          title='More actions'>
          <FiMoreVertical size={18} />
        </button>
      </div>
    </div>
  );
};

export default Finished;
