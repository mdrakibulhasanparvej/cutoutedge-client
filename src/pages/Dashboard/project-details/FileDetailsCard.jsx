import React from "react";
import { calculateTime } from "../../../utils/calculateTime";
import { FileText, User, Clock, History, ExternalLink } from "lucide-react";

const DetailsCard = ({ file }) => {
  const {
    _id,
    currentStage,
    assignedTo,
    filename,
    stagelogs,
    timeStartedAt,
    updatedAt,
  } = file;

  const { hoursAgo, minutesAgo } = calculateTime(updatedAt);

  // স্টেজ অনুযায়ী কালার ব্যাজ (অপশনাল কিন্তু সুন্দর দেখায়)
  const getStageColor = (stage) => {
    const s = stage?.toLowerCase();
    if (s?.includes("done") || s?.includes("finish"))
      return "bg-green-100 text-green-700 border-green-200";
    if (s?.includes("progress") || s?.includes("working"))
      return "bg-blue-100 text-blue-700 border-blue-200";
    return "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <div className='group w-full bg-white border border-gray-200 rounded-md p-4 shadow-sm hover:border-[#0F83B2] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4'>
      {/* Left Side: File Icon & Info */}
      <div className='flex items-start gap-4 flex-1'>
        <div className='p-3 bg-gray-50 rounded text-gray-400 group-hover:text-[#0F83B2] group-hover:bg-blue-50 transition-colors'>
          <FileText size={24} />
        </div>

        <div className='space-y-2 flex-1'>
          {/* Filename & Stage Badge */}
          <div className='flex flex-wrap items-center gap-2'>
            <h3 className='text-sm font-bold text-[#172B4D] break-all leading-tight'>
              {filename || "Unnamed File"}
            </h3>
            {currentStage && (
              <span
                className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border ${getStageColor(currentStage)}`}>
                {currentStage}
              </span>
            )}
          </div>

          {/* Details Meta Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-y-2 gap-x-4 text-[12px]'>
            <div className='flex items-center gap-1.5 text-gray-500'>
              <User size={14} className='text-gray-400' />
              <span className='font-medium text-gray-700'>
                {assignedTo || "Unassigned"}
              </span>
            </div>

            <div className='flex items-center gap-1.5 text-gray-500'>
              <Clock size={14} className='text-gray-400' />
              <span>
                Updated{" "}
                {hoursAgo === 0
                  ? `${minutesAgo}m`
                  : `${hoursAgo}h ${minutesAgo}m`}{" "}
                ago
              </span>
            </div>

            <div className='flex items-center gap-1.5 text-gray-500'>
              <History size={14} className='text-gray-400' />
              <span>{stagelogs?.length || 0} Stage Logs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Action Button */}
      <div className='flex items-center gap-3 pl-14 md:pl-0'>
        {/* Started Date (Small text) */}
        <div className='hidden lg:block text-right mr-2'>
          <p className='text-[10px] text-gray-400 uppercase font-bold'>
            Started At
          </p>
          <p className='text-[11px] text-gray-600 font-medium'>
            {timeStartedAt
              ? new Date(timeStartedAt).toLocaleDateString("en-GB")
              : "Pending"}
          </p>
        </div>

        <button
          onClick={() => console.log("Viewing stages for file:", _id)}
          className='flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#F4F5F7] text-[#172B4D] text-xs font-bold rounded border border-gray-300 transition-all active:scale-95 shadow-sm'>
          <ExternalLink size={14} />
          View Stages
        </button>
      </div>
    </div>
  );
};

export default DetailsCard;
