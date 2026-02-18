import React from "react";
import {
  FiCheckCircle,
  FiXCircle,
  FiAlertTriangle,
  FiClock,
  FiMoreVertical,
  FiEye,
  FiRotateCcw,
} from "react-icons/fi";

const QualityControl2 = ({
  order = {
    id: "#4568",
    title: "Bundle of product photos - Round 2",
    completedQc1At: "2 hours ago",
    imagesCount: 47,
    approvedCount: 38,
    rejectedCount: 9,
    needsReworkCount: 4,
    status: "quality-control-2",
    priority: "high",
    criticalIssues: 2,
  },
  onFinalApprove,
  onReviewDetails,
  onSendBack,
}) => {
  const approvalRate =
    Math.round((order.approvedCount / order.imagesCount) * 100) || 0;

  const hasCriticalIssues = order.criticalIssues > 0;
  const hasRework = order.needsReworkCount > 0;

  const statusColor = hasCriticalIssues
    ? "bg-red-600"
    : hasRework
      ? "bg-amber-600"
      : "bg-indigo-600";

  return (
    <div
      className="
        group w-full
        flex flex-col sm:flex-row
        sm:items-center gap-4
        px-4 py-4
        bg-white border border-gray-100 rounded-xl
        hover:shadow-md hover:-translate-y-0.5 transition-all
      "
    >
      {/* Left */}
      <div className="flex items-center gap-3 min-w-[130px]">
        <div className="relative h-3 w-3">
          {hasCriticalIssues ? (
            <>
              <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-30" />
              <div className="relative h-3 w-3 rounded-full bg-red-600" />
            </>
          ) : (
            <div className={`h-3 w-3 rounded-full ${statusColor}`} />
          )}
        </div>
        <span className="font-semibold text-gray-900">{order.id}</span>
      </div>

      {/* Main */}
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-medium text-gray-900 truncate max-w-[260px] sm:max-w-full">
            {order.title}
          </h3>

          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-800 border-indigo-300">
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

        {/* Progress */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              approvalRate >= 95
                ? "bg-green-600"
                : approvalRate >= 85
                  ? "bg-emerald-500"
                  : "bg-orange-500"
            }`}
            style={{ width: `${approvalRate}%` }}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between text-xs text-gray-600">
          <div className="flex flex-wrap items-center gap-4">
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

          <div className="font-semibold">{approvalRate}%</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2 justify-end sm:justify-start">
        <button
          onClick={onReviewDetails}
          className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2
            text-sm font-medium text-white hover:bg-indigo-700 transition"
        >
          <FiEye size={16} />
          Review
        </button>

        <button
          onClick={onFinalApprove}
          disabled={hasCriticalIssues || approvalRate < 90}
          className="flex items-center gap-1.5 rounded-lg bg-green-600 px-4 py-2
            text-sm font-medium text-white hover:bg-green-700 transition
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiCheckCircle size={16} />
          Final Approve
        </button>

        <button
          onClick={onSendBack}
          className="flex items-center gap-1.5 rounded-lg border border-amber-600 px-4 py-2
            text-sm font-medium text-amber-700 hover:bg-amber-50 transition"
        >
          <FiRotateCcw size={16} />
          Send Back
        </button>

        <button
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition"
          title="More actions"
        >
          <FiMoreVertical size={18} />
        </button>
      </div>
    </div>
  );
};

export default QualityControl2;
