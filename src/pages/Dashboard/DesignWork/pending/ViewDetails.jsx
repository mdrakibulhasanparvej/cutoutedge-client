import React from "react";
import {
  FiClock,
  FiImage,
  FiCheckCircle,
  FiXCircle,
  FiAlertTriangle,
  FiDownload,
  FiExternalLink,
  FiArrowLeft,
  FiUser,
  FiCalendar,
  FiFileText,
  FiPlayCircle,
} from "react-icons/fi";
import { useNavigate } from "react-router";

const ViewDetails = ({
  order = {
    id: "#4568",
    title: "Bundle of product photos - Summer Collection",
    status: "completed",
    createdAt: "Jan 8, 2026",
    startedAt: "Jan 9, 2026",
    finishedAt: "Jan 10, 2026 14:32",
    totalProcessingTime: "14m 32s",
    imagesCount: 47,
    approvedCount: 45,
    rejectedCount: 2,
    qcIssues: 3,
    priority: "high",
    assignedTo: "Rakibul Hasan",
    notes:
      "Client requested natural lighting only. Minor color correction needed on 3 images.",
    outputUrl: "/downloads/bundle-4568.zip",
  },
  onClose,
  onDownload,
}) => {
  const approvalRate = Math.round(
    (order.approvedCount / order.imagesCount) * 100
  );
  const navigate = useNavigate();

  const statusConfig = {
    pending: { color: "bg-amber-100 text-amber-800", label: "Pending" },
    processing: { color: "bg-blue-100 text-blue-800", label: "Processing" },
    "quality-control": {
      color: "bg-purple-100 text-purple-800",
      label: "QC-1",
    },
    "quality-control-2": {
      color: "bg-indigo-100 text-indigo-800",
      label: "QC-2",
    },
    completed: { color: "bg-green-100 text-green-800", label: "Completed" },
    failed: { color: "bg-red-100 text-red-800", label: "Failed" },
  };

  const currentStatus = statusConfig[order.status] || {
    color: "bg-gray-100 text-gray-800",
    label: "Unknown",
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              <FiArrowLeft size={20} />
            </button>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{order.id}</h2>
              <p className="text-sm text-gray-600 truncate max-w-75 md:max-w-none">
                {order.title}
              </p>
            </div>
          </div>

          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${currentStatus.color}`}
          >
            {currentStatus.label}
          </span>
        </div>

        {/* Content - scrollable */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Timeline / Key Dates */}
            <div className="col-span-full md:col-span-2 lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FiCalendar className="text-blue-600" />
                Timeline
              </h3>
              <div className="space-y-4">
                {[
                  {
                    label: "Created",
                    value: order.createdAt,
                    icon: FiCalendar,
                  },
                  {
                    label: "Started",
                    value: order.startedAt,
                    icon: FiPlayCircle,
                  },
                  {
                    label: "Finished",
                    value: order.finishedAt,
                    icon: FiCheckCircle,
                  },
                  {
                    label: "Duration",
                    value: order.totalProcessingTime,
                    icon: FiClock,
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 text-blue-600">
                      {<item.icon size={18} />}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{item.label}</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="col-span-full md:col-span-2 lg:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Results Summary</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {order.imagesCount}
                  </p>
                  <p className="text-sm text-gray-600">Total Images</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-green-700">
                    {order.approvedCount}
                  </p>
                  <p className="text-sm text-green-700">Approved</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-red-700">
                    {order.rejectedCount}
                  </p>
                  <p className="text-sm text-red-700">Rejected</p>
                </div>
              </div>

              {/* Approval Rate Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium">Overall Approval Rate</span>
                  <span className="font-bold text-green-700">
                    {approvalRate}%
                  </span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 transition-all duration-1000"
                    style={{ width: `${approvalRate}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <FiUser className="text-indigo-600" />
                Processing Info
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-600">Priority:</span>{" "}
                  <span className="font-medium">
                    {order.priority === "high" ? "High" : "Normal"}
                  </span>
                </p>
                <p>
                  <span className="text-gray-600">Assigned to:</span>{" "}
                  <span className="font-medium">{order.assignedTo}</span>
                </p>
                {order.qcIssues > 0 && (
                  <p className="flex items-center gap-2 text-amber-700">
                    <FiAlertTriangle size={16} />
                    <span>{order.qcIssues} issues flagged during QC</span>
                  </p>
                )}
              </div>
            </div>

            {order.notes && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <FiFileText className="text-blue-600" />
                  Notes
                </h3>
                <p className="text-gray-700 whitespace-pre-line text-sm">
                  {order.notes}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t bg-gray-50 flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            Close
          </button>

          <button
            onClick={onDownload}
            disabled={!order.outputUrl}
            className="px-6 py-2.5 rounded-lg bg-green-600 text-white font-medium 
                     hover:bg-green-700 transition-colors flex items-center gap-2 justify-center
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiDownload size={18} />
            Download Final Files
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
