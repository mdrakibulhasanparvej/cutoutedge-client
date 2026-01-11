import React from "react";
import {
  FiClock,
  FiImage,
  FiLoader, // spinning loader icon
  FiMoreVertical,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

const InProgress = ({
  order = {
    id: "#4568",
    title: "Bundle of product photos",
    startedAt: "12 minutes ago",
    imagesCount: 47,
    processedCount: 28, // how many already done
    status: "processing",
    priority: "normal",
    progress: 60, // 0–100 (percentage)
  },
  onPause,
  onCancel,
}) => {
  const progress = Math.min(Math.max(order.progress || 0, 0), 100);
  const isAlmostDone = progress >= 90;

  return (
    <div
      className={`
         group flex items-center gap-4 px-4 py-3.5
        bg-white border-b border-gray-100
        rounded-xl hover:shadow-sm hover:scle-1.02 transition-colors
        last:border-b-0
      `}
    >
      {/* Status dot + ID */}
      <div className="flex items-center gap-3 min-w-[140px]">
        <div className="relative h-2.5 w-2.5">
          <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-40" />
          <div className="relative h-2.5 w-2.5 rounded-full bg-blue-600" />
        </div>
        <span className="font-medium text-gray-900">{order.id}</span>
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-gray-900 truncate">{order.title}</h3>

          <span
            className="
            inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
            bg-blue-100 text-blue-800 border border-blue-300
          "
          >
            Processing
          </span>

          {order.priority === "high" && (
            <span className="inline-flex items-center rounded bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700">
              High Priority
            </span>
          )}
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div
            className={`h-2.5 rounded-full transition-all duration-500 ease-out ${
              isAlmostDone ? "bg-green-500" : "bg-blue-600"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1">
              <FiClock size={14} />
              <span>Started {order.startedAt}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiImage size={14} />
              <span>
                {order.processedCount} / {order.imagesCount}
              </span>
            </div>
          </div>

          <div className="font-medium">{progress}%</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity md:opacity-70">
        <button
          onClick={onPause}
          className="flex items-center gap-1.5 rounded-lg border border-amber-600 px-3.5 py-1.5 
                   text-sm font-medium text-amber-700 hover:bg-amber-50 transition-colors"
        >
          <FiLoader size={16} className="animate-spin" />
          Pause
        </button>

        <button
          onClick={onCancel}
          className="flex items-center gap-1.5 rounded-lg border border-red-600 px-3.5 py-1.5 
                   text-sm font-medium text-red-700 hover:bg-red-50 transition-colors"
        >
          <FiXCircle size={16} />
          Cancel
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

export default InProgress;
