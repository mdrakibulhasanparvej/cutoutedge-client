import React from "react";
import {
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiClock,
  FiMoreVertical,
  FiEye,
} from "react-icons/fi";

const QualityControl = ({
  order = {
    id: "#4568",
    title: "Bundle of product photos",
    completedAt: "8 minutes ago",
    imagesCount: 47,
    approvedCount: 42,
    rejectedCount: 5,
    status: "quality-control",
    priority: "normal",
    qcIssues: 3,
  },
  onApproveAll,
  onReview,
}) => {
  const approvalRate =
    Math.round((order.approvedCount / order.imagesCount) * 100) || 0;
  const hasIssues = order.qcIssues > 0 || order.rejectedCount > 0;

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
      <div className='flex items-center gap-3 min-w-32.5'>
        <div className='relative h-3 w-3'>
          {hasIssues ? (
            <>
              <div className='absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-30' />
              <div className='relative h-3 w-3 rounded-full bg-amber-600' />
            </>
          ) : (
            <div className='h-3 w-3 rounded-full bg-green-500' />
          )}
        </div>

        <span className='font-semibold text-gray-900 text-[14px]'>
          {order.id}
        </span>
      </div>

      {/* Main */}
      <div className='flex-1 min-w-0 space-y-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <h3 className='font-medium text-[14px] text-gray-900 truncate max-w-65 sm:max-w-full'>
            {order.title}
          </h3>

          <span className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 border-purple-300'>
            Quality Control
          </span>

          {hasIssues && (
            <span className='inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800'>
              <FiAlertCircle size={13} />
              {order.qcIssues} issues
            </span>
          )}

          {order.priority === "high" && (
            <span className='inline-flex items-center rounded bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700'>
              High Priority
            </span>
          )}
        </div>

        {/* Approval Progress */}
        <div className='w-full bg-gray-200 rounded-full h-2.5 overflow-hidden'>
          <div
            className='h-full rounded-full bg-green-600 transition-all duration-700'
            style={{ width: `${approvalRate}%` }}
          />
        </div>

        <div className='flex flex-wrap items-center justify-between text-xs text-gray-600'>
          <div className='flex flex-wrap items-center gap-4'>
            <div className='flex items-center gap-1'>
              <FiClock size={14} />
              <span>Finished {order.completedAt}</span>
            </div>

            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-1 text-green-700'>
                <FiCheckCircle size={14} />
                <span>{order.approvedCount} approved</span>
              </div>
              <div className='flex items-center gap-1 text-red-700'>
                <FiXCircle size={14} />
                <span>{order.rejectedCount} rejected</span>
              </div>
            </div>
          </div>

          <div className='font-semibold text-gray-800'>{approvalRate}%</div>
        </div>
      </div>

      {/* Actions */}
      <div className='flex items-center gap-2 justify-end sm:justify-start'>
        <button
          onClick={onReview}
          className='flex items-center gap-1.5 rounded-lg bg-[#0F83B2] px-4 py-1
            text-sm font-medium text-white hover:bg-[#066388] transition'>
          <FiEye size={16} />
          Review
        </button>

        <button
          onClick={onApproveAll}
          disabled={hasIssues}
          className='flex items-center gap-1.5 rounded-lg border border-green-600 px-4 py-1
            text-sm font-medium text-green-700 hover:bg-green-50 transition
            disabled:opacity-50 disabled:cursor-not-allowed'>
          <FiCheckCircle size={16} />
          Approve
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

export default QualityControl;
