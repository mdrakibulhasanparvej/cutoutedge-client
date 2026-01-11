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
    status: "pending", // pending | processing | failed | completed
    priority: "normal", // optional: high / normal / low
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
        <div
          className={`h-2.5 w-2.5 rounded-full ${
            order.status === "pending"
              ? "bg-amber-500"
              : order.status === "processing"
                ? "bg-blue-500"
                : order.status === "failed"
                  ? "bg-red-500"
                  : "bg-green-500"
          }`}
        />
        <span className="font-medium text-gray-900">{order.id}</span>
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-gray-900 truncate">{order.title}</h3>

          <span
            className={`
              inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
              ${getStatusStyles(order.status)}
            `}
          >
            {order.status === "pending"
              ? "Pending"
              : order.status === "processing"
                ? "Processing"
                : order.status === "failed"
                  ? "Failed"
                  : "Completed"}
          </span>

          {order.priority === "high" && (
            <span className="inline-flex items-center rounded bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700">
              High Priority
            </span>
          )}
        </div>

        <div className="mt-1 flex items-center gap-5 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <FiClock size={14} />
            <span>{order.createdAt}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiImage size={14} />
            <span>{order.imagesCount} images</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity md:opacity-100">
        {order.status === "pending" && (
          <button
            onClick={onStart}
            className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 
                     text-sm font-medium text-white hover:bg-blue-700 active:bg-blue-800 transition-colors"
          >
            <FiPlayCircle size={16} />
            Start
          </button>
        )}

        {order.status === "failed" && (
          <button
            className="flex items-center gap-1.5 rounded-lg border border-red-600 px-3.5 py-1.5 
                     text-sm font-medium text-red-700 hover:bg-red-50 transition-colors"
          >
            <FiAlertCircle size={16} />
            Retry
          </button>
        )}

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

export default Pending;
