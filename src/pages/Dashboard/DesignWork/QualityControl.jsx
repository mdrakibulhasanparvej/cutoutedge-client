import React from "react";
import {
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiImage,
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
    qcIssues: 3, // number of images with issues flagged
  },
  onApproveAll,
  onReview,
  onReject,
}) => {
  const approvalRate =
    Math.round((order.approvedCount / order.imagesCount) * 100) || 0;
  const hasIssues = order.qcIssues > 0 || order.rejectedCount > 0;

  return (
    <div
      className={`
        group flex items-center gap-4 px-4 py-3.5
        bg-white border-b border-gray-100
        rounded-xl hover:shadow-sm hover:scle-1.02 transition-colors
        last:border-b-0
      `}
    >
      {/* Status indicator + ID */}
      <div className="flex items-center gap-3 min-w-[140px]">
        <div className="relative h-2.5 w-2.5">
          {hasIssues ? (
            <>
              <div className="absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-30" />
              <div className="relative h-2.5 w-2.5 rounded-full bg-amber-600" />
            </>
          ) : (
            <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
          )}
        </div>
        <span className="font-medium text-gray-900">{order.id}</span>
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-medium text-gray-900 truncate">{order.title}</h3>

          <span
            className="
            inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
            bg-purple-100 text-purple-800 border border-purple-300
          "
          >
            Quality Control
          </span>

          {hasIssues && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
              <FiAlertCircle size={13} />
              {order.qcIssues} issues
            </span>
          )}

          {order.priority === "high" && (
            <span className="inline-flex items-center rounded bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700">
              High Priority
            </span>
          )}
        </div>

        {/* Approval progress */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div
            className="h-2.5 rounded-full bg-green-500 transition-all duration-500"
            style={{ width: `${approvalRate}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-5 flex-wrap">
            <div className="flex items-center gap-1">
              <FiClock size={14} />
              <span>Finished {order.completedAt}</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-green-700">
                <FiCheckCircle size={14} />
                <span>{order.approvedCount} approved</span>
              </div>
              <div className="flex items-center gap-1 text-red-700">
                <FiXCircle size={14} />
                <span>{order.rejectedCount} rejected</span>
              </div>
            </div>
          </div>

          <div className="font-medium text-gray-800">{approvalRate}%</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity md:opacity-70">
        <button
          onClick={onReview}
          className="flex items-center gap-1.5 rounded-lg bg-purple-600 px-3.5 py-1.5 
                   text-sm font-medium text-white hover:bg-purple-700 transition-colors"
        >
          <FiEye size={16} />
          Review
        </button>

        <button
          onClick={onApproveAll}
          disabled={hasIssues}
          className="flex items-center gap-1.5 rounded-lg border border-green-600 px-3.5 py-1.5 
                   text-sm font-medium text-green-700 hover:bg-green-50 transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiCheckCircle size={16} />
          Approve All
        </button>

        <button
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          title="More actions"
        >
          <FiMoreVertical size={18} />
        </button>
      </div>
    </div>
  );
};

export default QualityControl;
