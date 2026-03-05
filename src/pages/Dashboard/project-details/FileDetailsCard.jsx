import React, { memo } from "react";
import { FileText, User, History, ExternalLink, Clock } from "lucide-react";
import useUser from "../../../hook/useUser";
import Timer from "../common/Timer";
import WorkActions from "../common/WorkActions";
import ActionButton from "../common/ActionButton";

const FileDetailsCard = memo(({ file, orderId, refetch, onViewLogs }) => {

  const { userId, role } = useUser();
  const {
    currentStage,
    assignedTo,
    filename,
    stageLogs,
  } = file;
  const { name } = assignedTo || {};

  const timerData = stageLogs.find(s => s?.stage === currentStage)?.timer;

  // role based permissions
  const isAssignedUser = assignedTo?._id === userId;
  const isAdminOrIncharge = role === 'admin' || role === 'incharge';
  const canViewTimer = isAssignedUser || isAdminOrIncharge;

  const getStageColor = (stage) => {
    const s = stage?.toLowerCase();
    if (s === "done")
      return "bg-emerald-50 text-emerald-600 border-emerald-200";
    else if (s === "in-progress")
      return "bg-blue-50 text-blue-600 border-blue-200";
    else if (s === "qc1" || s === "qc2")
      return "bg-purple-50 text-purple-600 border-purple-200";
    return "bg-slate-50 text-slate-600 border-slate-200";
  };

  return (
    <div className="group w-full bg-white border border-slate-200 rounded-xl  overflow-hidden shadow-sm hover:shadow-md hover:border-[#0F83B2] transition-all flex flex-col md:flex-row">

      {/* LEFT HALF: Meta Data (50%) */}
      <div className="flex-1 p-5 flex items-start gap-4">
        <div className="p-3 bg-slate-50 rounded-lg text-slate-400 group-hover:text-[#0F83B2] transition-colors">
          <FileText size={24} />
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-bold text-slate-800">{filename}</h3>
            <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded border ${getStageColor(currentStage)}`}>
              {currentStage}
            </span>
          </div>
          <div className="flex gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1"><User size={14} /> {name || "Unassigned"}</span>
            <span className="flex items-center gap-1"><History size={14} /> {stageLogs?.length} Logs</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col sm:flex-row ">

        <div className="flex-1 p-4 flex items-center justify-center">
          {canViewTimer ? (
            <Timer timerData={timerData} />
          ) : (
            <div className="text-slate-300 italic text-xs">
              No Active Timer
            </div>
          )}
        </div>

        <div className="flex-1 flex p-2 flex-col justify-center gap-1 ">
          <WorkActions file={file} orderId={orderId} refetch={refetch} />

          <button
            onClick={() => onViewLogs(stageLogs)}
            className="flex items-center justify-center text-sm px-2 py-1 gap-2 bg-white hover:bg-slate-50 text-slate-600 font-bold rounded border border-slate-200 transition-all active:scale-95 shadow-sm"
          >
            <ExternalLink size={13} />
            View History
          </button>
        </div>
      </div>
    </div>
  );
});

export default FileDetailsCard;