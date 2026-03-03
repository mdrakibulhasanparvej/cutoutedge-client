import React, { memo } from "react";
import { FileText, User, Clock, History, ExternalLink, PlayCircleIcon, PauseCircle } from "lucide-react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import MyConfirmAlert from "../common/MyConfirmAlert";
import MyAlert from "../common/MyAler";
import useUser from "../../../hook/useUser";
import Timer from "../common/Timer";
import WorkActions from "../common/WorkActions";

const FileDetailsCard = memo(({ file, orderId, refetch, onViewLogs }) => {

  const { userId, role } = useUser()
  const axiosSecure = useAxiosSecure()
  const {
    _id,
    currentStage,
    assignedTo,
    filename,
    stageLogs,
  } = file;
  console.log(file)
  const { name } = assignedTo || {}

  const timerData = stageLogs.find(s => s?.stage === currentStage)?.timer
  // const isRunning = stageLogs.find(s => s?.stage === currentStage)?.timer?.isRunning

  // role based permissions
  const isAssignedUser = assignedTo?._id === userId;
  const isAdminOrIncharge = role === 'admin' || role === 'incharge'
  const canViewTimer = isAssignedUser || isAdminOrIncharge

  // functions

  const getStageColor = (stage) => {
    const s = stage?.toLowerCase();
    if (s?.includes("done") || s?.includes("finish"))
      return "bg-green-100 text-green-700 border-green-200";
    if (s?.includes("progress") || s?.includes("working"))
      return "bg-blue-100 text-blue-700 border-blue-200";
    return "bg-gray-100 text-gray-700 border-gray-200";
  };

  // const handleStartWork = async () => {

  //   const data = {
  //     orderId,
  //     filename,
  //     userId
  //   }

  //   const result = await MyConfirmAlert({
  //     title: "Are you sure u want to start editing this file?",
  //     text: "Your work timer will start if you click yes",
  //     icon: "info"
  //   })
  //   if (result.isConfirmed) {
  //     try {
  //       axiosSecure.post('/files/start', data)
  //         .then(() => {
  //           MyAlert({
  //             title: "Success",
  //             text: "you have started this design",
  //             icon: "success"
  //           })
  //           refetch()
  //         })
  //     } catch (err) {
  //       MyAlert({
  //         title: "error",
  //         text: "Something went wrong, please try again",
  //         icon: "error"
  //       })
  //       console.log(err.message)
  //     }
  //   }
  // }

  // const handleTimer = async () => {
  //   try {
  //     const data = {
  //       orderId,
  //       filename,
  //       userId
  //     }
  //     console.log(data)
  //     axiosSecure.post(`/files/pause`, data)
  //       .then(() => {
  //         MyAlert({
  //           title: "Success",
  //           text: "you have started this design",
  //           icon: "success"
  //         })
  //         refetch()
  //       })
  //   } catch (err) {
  //     MyAlert({
  //       title: "error",
  //       text: "Something went wrong, please try again",
  //       icon: "error"
  //     })
  //     console.log(err.message)
  //   }
  // }

  // const handleStartTimer = async () => {
  //   try {
  //     const data = {
  //       orderId,
  //       filename,
  //       userId
  //     }
  //     console.log(data)
  //     axiosSecure.post(`/files/resume`, data)
  //       .then(() => {
  //         MyAlert({
  //           title: "Success",
  //           text: "you have started the timer",
  //           icon: "success"
  //         })
  //         refetch()
  //       })
  //   } catch (err) {
  //     MyAlert({
  //       title: "error",
  //       text: "Something went wrong, please try again",
  //       icon: "error"
  //     })
  //     console.log(err.message)
  //   }
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

        {canViewTimer && <div className='flex lg:block text-right mr-2'>
          <p className='text-[10px] text-start text-gray-400 uppercase font-bold'>
            Work Timer:
          </p>
          <div className='text-[11px] text-gray-600 font-medium w-24'>
            <Timer timerData={timerData} />
          </div>
        </div>}

        {/* User actions */}
        <div className="space-y-1">
          <WorkActions file={file} orderId={orderId} refetch={refetch} />

          <button
            onClick={() => onViewLogs(stageLogs)}
            className='flex items-center justify-center px-2 py-1 gap-px bg-white hover:bg-[#F4F5F7] text-[#172B4D] text-xs font-bold rounded border border-gray-300 transition-all active:scale-95 shadow-sm w-full cursor-pointer'>
            <ExternalLink size={14} />
            View Stages
          </button>
        </div>
      </div>
    </div>
  );
});

export default FileDetailsCard;
