import React from "react";
import {
  FiCheckCircle,
  FiXCircle,
  FiAlertTriangle, // more serious warning icon
  FiImage,
  FiClock,
  FiMoreVertical,
  FiEye,
  FiRotateCcw, // "rework" / sent back icon
} from "react-icons/fi";

const QualityControl2 = ({
  order = {
    id: "#4568",
    title: "Bundle of product photos - Round 2",
    completedQc1At: "2 hours ago",
    imagesCount: 47,
    approvedCount: 38, // usually lower than QC1
    rejectedCount: 9,
    needsReworkCount: 4,
    status: "quality-control-2",
    priority: "high",
    criticalIssues: 2, // serious issues that block approval
  },
  onFinalApprove,
  onReviewDetails,
  onSendBack,
}) => {
  const approvalRate =
    Math.round((order.approvedCount / order.imagesCount) * 100) || 0;

  const hasCriticalIssues = order.criticalIssues > 0;
  const hasRework = order.needsReworkCount > 0;

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
          {hasCriticalIssues ? (
            <>
              <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-40" />
              <div className="relative h-2.5 w-2.5 rounded-full bg-red-600" />
            </>
          ) : hasRework ? (
            <div className="h-2.5 w-2.5 rounded-full bg-amber-600" />
          ) : (
            <div className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
          )}
        </div>
        <span className="font-medium text-gray-900">{order.id}</span>
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0 space-y-2.5">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-medium text-gray-900 truncate">{order.title}</h3>

          <span
            className="
            inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
            bg-indigo-100 text-indigo-800 border border-indigo-300
          "
          >
            QC-2 • Final Review
          </span>

          {hasCriticalIssues && (
            <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
              <FiAlertTriangle size={13} />
              {order.criticalIssues} critical
            </span>
          )}

          {hasRework && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
              <FiRotateCcw size={13} />
              {order.needsReworkCount} rework
            </span>
          )}

          {order.priority === "high" && (
            <span className="inline-flex items-center rounded bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700">
              High Priority
            </span>
          )}
        </div>

        {/* Progress bar - more strict coloring */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div
            className={`h-2.5 rounded-full transition-all duration-500 ${
              approvalRate >= 95
                ? "bg-green-600"
                : approvalRate >= 85
                  ? "bg-emerald-500"
                  : "bg-orange-500"
            }`}
            style={{ width: `${approvalRate}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-gray-600 flex-wrap gap-3">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1">
              <FiClock size={14} />
              <span>QC-1 done {order.completedQc1At}</span>
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

          <div className="font-medium">{approvalRate}%</div>
        </div>
      </div>

      {/* Actions - more decisive buttons */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity md:opacity-80">
        <button
          onClick={onReviewDetails}
          className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 
                   text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
        >
          <FiEye size={16} />
          Detailed Review
        </button>

        <button
          onClick={onFinalApprove}
          disabled={hasCriticalIssues || approvalRate < 90}
          className="flex items-center gap-1.5 rounded-lg bg-green-600 px-3.5 py-1.5 
                   text-sm font-medium text-white hover:bg-green-700 transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiCheckCircle size={16} />
          Final Approve
        </button>

        <button
          onClick={onSendBack}
          className="flex items-center gap-1.5 rounded-lg border border-amber-600 px-3.5 py-1.5 
                   text-sm font-medium text-amber-700 hover:bg-amber-50 transition-colors"
        >
          <FiRotateCcw size={16} />
          Send Back
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

export default QualityControl2;
