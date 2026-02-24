import React from "react";
import { FileText, User, Clock, History, ExternalLink, PlayCircleIcon, PauseCircle } from "lucide-react";
import StageLogModal from "./StageLogModal";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import MyConfirmAlert from "../common/MyConfirmAlert";
import MyAlert from "../common/MyAler";
import useUser from "../../../hook/useUser";
import Timer from "../common/Timer";

const FileDetailsCard = ({ file, orderId }) => {
  const { userId } = useUser()
  const axiosSecure = useAxiosSecure()
  const {
    _id,
    currentStage,
    assignedTo,
    filename,
    stageLogs,
    timerStartedAt,
  } = file;

  const { name } = assignedTo || {}

  const getStageColor = (stage) => {
    const s = stage?.toLowerCase();
    if (s?.includes("done") || s?.includes("finish"))
      return "bg-green-100 text-green-700 border-green-200";
    if (s?.includes("progress") || s?.includes("working"))
      return "bg-blue-100 text-blue-700 border-blue-200";
    return "bg-gray-100 text-gray-700 border-gray-200";
  };

  const handleStartWork = async () => {

    const data = {
      orderId,
      filename,
      userId
    }

    const result = await MyConfirmAlert({
      title: "Are you sure u want to start editing this file?",
      text: "Your work timer will start if you click yes",
      icon: "info"
    })
    if (result.isConfirmed) {
      axiosSecure.post('/files/start', data)
        .then(() => {
          MyAlert({
            title: "Success",
            text: "you have started this design",
            icon: "success"
          })
        })
    }
  }

  // const handleTimer = async (_id, status) => {
  //   const data = {

  //   }
  //   // axiosSecure.patch(`/files/pause/${_id}?timer-status=${status}`,)
  // }


  return (
    <div className='group w-full bg-white border border-gray-200 rounded-md p-4 shadow-sm hover:border-[#0F83B2] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4'>
      {/* File Icon & Info */}
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
                {name || "Unassigned"}
              </span>
            </div>

            {/* <div className='flex items-center gap-1.5 text-gray-500'>
              <Clock size={14} className='text-gray-400' />
              <span>
                Updated{" "}
                {hoursAgo === 0
                  ? `${minutesAgo}m`
                  : `${hoursAgo}h ${minutesAgo}m`}{" "}
                ago
              </span>
            </div> */}

            <div className='flex items-center gap-1.5 text-gray-500'>
              <History size={14} className='text-gray-400' />
              <span>{stageLogs?.length || 0} Stage Logs</span>
            </div>
          </div>
        </div>
      </div>

      <div className='flex items-center gap-3 pl-14 md:pl-0'>

        <div className='flex lg:block text-right mr-2'>
          <p className='text-[10px] text-start text-gray-400 uppercase font-bold'>
            Timer:
          </p>
          <p className='text-[11px] text-gray-600 font-medium'>
            {timerStartedAt
              ? <Timer startedAt={timerStartedAt} />
              : "pending"}
          </p>
        </div>

        <div className="space-y-1">

          <div>
            {!assignedTo ?
              <button
                onClick={handleStartWork}
                className='flex items-center justify-center px-2 py-1 gap-px bg-green-400 hover:bg-green-500 text-white text-xs font-bold rounded-md w-full transition-all active:scale-95 shadow-sm'>
                <PlayCircleIcon size={14} />
                Start
              </button>
              :
              <button
                // onClick={handleTimer}
                className='flex items-center justify-center px-2 py-1 gap-1 bg-yellow-400 hover:bg-yellow-500 text-white text-xs font-bold rounded-md w-full transition-all active:scale-95 shadow-sm'>
                <PauseCircle size={14} />
                Pause Timer
              </button>
            }
          </div>
          <button
            onClick={() => document.getElementById("my_modal_2").showModal()}
            className='flex items-center justify-center px-2 py-1 gap-px bg-white hover:bg-[#F4F5F7] text-[#172B4D] text-xs font-bold rounded border border-gray-300 transition-all active:scale-95 shadow-sm'>
            <ExternalLink size={14} />
            View Stages
          </button>
        </div>
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <StageLogModal stageLogs={stageLogs} />

    </div>
  );
};

export default FileDetailsCard;
