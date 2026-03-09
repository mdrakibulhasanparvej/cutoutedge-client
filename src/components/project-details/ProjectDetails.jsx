import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import FileDetailsCard from "./FileDetailsCard";
import Deadline from "../shared/timers/Deadline";
import {
  ChevronLeft,
  Clock,
  Share2,
  Edit2,
  Layers,
  FileText,
  Tag,
  Briefcase,
  User,
} from "lucide-react";
import useUser from "../../hooks/useUser";
import StageLogModal from "./StageLogModal";

const ProjectDetails = () => {
  const [selectedLogs, setSelectedLogs] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();
  const { orderId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { name } = useUser();

  const {
    isPending,
    data: order,
    refetch,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/files/order/${encodeURIComponent(orderId)}`,
      );
      return res.data || [];
    },
    staleTime: 60000,
  });

  if (isPending)
    return (
      <div className='flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900'>
        <div className='flex flex-col items-center gap-2'>
          <span className='loading loading-spinner text-[#0F83B2] loading-lg'></span>
          <p className='text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest'>
            Loading Order...
          </p>
        </div>
      </div>
    );

  const { instructions, categories, deadline, createdAt, priority, files } =
    order?.data || {};

  const filteredFiles = files?.filter((file) => {
    if (filterStatus === "all") return true;
    return file.currentStage === filterStatus;
  });

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 p-4 font-sans text-gray-800 dark:text-gray-100'>
      {/* Top Navigation */}
      <div className='max-w-7xl mx-auto flex items-center justify-between mb-4'>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center gap-1 text-xs font-bold text-gray-600 dark:text-gray-400 hover:text-[#0F83B2] transition-all bg-white dark:bg-gray-800 px-3 py-1.5 rounded border border-gray-200 dark:border-gray-700 shadow-sm'>
          <ChevronLeft size={14} /> BACK TO LIST
        </button>
      </div>

      <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5'>
        {/* === LEFT SIDEBAR === */}
        <div className='lg:col-span-3 space-y-4'>
          {/* Main ID & Status Card */}
          <div className='bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden'>
            <div className='p-5 space-y-4'>
              <div className='flex justify-between items-start'>
                <h1 className='text-2xl font-bold text-[#0F83B2] tracking-tight leading-none'>
                  {orderId}
                </h1>
                <button className='text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition-colors'>
                  <Share2 size={16} />
                </button>
              </div>

              <div className='flex flex-wrap items-center gap-2'>
                <span
                  className={`px-2 py-1 rounded text-[10px] font-extrabold text-white uppercase shadow-sm ${priority === "high" ? "bg-red-500" : "bg-[#5ABFDC]"}`}>
                  {priority || "Normal"}
                </span>
                <div className='flex items-center gap-1 px-2 py-1 bg-gray-50 rounded text-gray-500 text-[10px] font-bold border border-gray-100'>
                  <Clock size={12} /> <span>{deadline}H</span>
                </div>
              </div>

              <div className='bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900 rounded-md p-3'>
                <p className='text-[10px] font-bold text-rose-500 dark:text-rose-400 uppercase leading-none mb-1.5 tracking-wider'>
                  Time Remaining
                </p>
                <div className='text-lg font-black text-rose-600 dark:text-rose-500 leading-none'>
                  <Deadline createdAt={createdAt} orderDeadline={deadline} />
                </div>
              </div>

              {/* Metadata */}
              <div className='space-y-2.5 text-[12px] pt-3 border-t border-gray-200 dark:border-gray-700'>
                <div className='flex items-center gap-2 text-gray-600 dark:text-gray-400'>
                  <User
                    size={14}
                    className='text-gray-400 dark:text-gray-600'
                  />
                  <span className='font-medium truncate text-[11px]'>
                    Created By: {name}
                  </span>
                </div>
                <div className='flex items-center gap-2 text-gray-600 dark:text-gray-400 text-[11px]'>
                  <Clock
                    size={14}
                    className='text-gray-400 dark:text-gray-600'
                  />
                  <span>
                    <strong>Recv:</strong>{" "}
                    {new Date(createdAt).toLocaleDateString("en-GB")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details Card */}
          <div className='bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 p-5 shadow-sm space-y-5'>
            <div>
              <label className='text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-3'>
                <Layers size={12} className='text-[#0F83B2]' /> Categories
              </label>
              <div className='flex flex-wrap gap-1.5'>
                {categories?.map((cat, i) => (
                  <span
                    key={i}
                    className='bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900 text-[10px] font-bold'>
                    {cat}
                  </span>
                )) || (
                  <span className='text-gray-400 dark:text-gray-600 italic text-[11px]'>
                    No category
                  </span>
                )}
              </div>
            </div>

            <div className='pt-3 space-y-2.5 border-t border-gray-200 dark:border-gray-700'>
              <div className='flex justify-between text-[11px]'>
                <span className='text-gray-600 dark:text-gray-400 font-bold uppercase tracking-tighter'>
                  Format:
                </span>
                <span className='font-bold text-gray-800 dark:text-gray-200'>
                  PSD / Layers
                </span>
              </div>
              <div className='flex justify-between text-[11px]'>
                <span className='text-gray-600 dark:text-gray-400 font-bold uppercase tracking-tighter'>
                  Files:
                </span>
                <span className='font-bold text-[#0F83B2]'>
                  {files?.length || 0} Total
                </span>
              </div>
            </div>

            <div>
              <label className='text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-2'>
                <Tag size={12} className='text-[#0F83B2]' /> Status Tags
              </label>
              <div className='flex gap-1'>
                <span className='bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-900 px-2 py-0.5 rounded text-[10px] font-bold uppercase'>
                  Ready
                </span>
              </div>
            </div>
          </div>
        </div>

        {/*  RIGHT AREA  */}
        <div className='lg:col-span-9 space-y-5'>
          {/* instructions */}
          <div className='bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden'>
            <div className='p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center'>
              <h3 className='flex items-center gap-2 text-[12px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest'>
                <FileText size={14} className='text-[#0F83B2]' /> Production
                Instructions
              </h3>
              <Edit2
                size={14}
                className='text-gray-400 dark:text-gray-600 cursor-pointer hover:text-[#0F83B2] transition-colors'
              />
            </div>
            <div className='p-5'>
              <div className='bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded text-[13px] text-yellow-800 dark:text-yellow-600 leading-relaxed border border-yellow-200 dark:border-yellow-900/30 italic shadow-sm'>
                {instructions ||
                  "No additional instructions provided for this order."}
              </div>
            </div>
          </div>

          {/*  SORTING & FILTERING BAR  */}
          <div className='bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 shadow-sm p-3 flex flex-wrap items-center justify-between gap-4'>
            <div className='flex items-center gap-2'>
              <div className='p-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-md text-blue-600 dark:text-blue-400'>
                <Layers size={16} />
              </div>
              <div>
                <h4 className='text-[11px] font-black uppercase tracking-wider text-gray-700 dark:text-gray-300 leading-none'>
                  Workflow Filter
                </h4>
                <p className='text-[10px] text-gray-600 dark:text-gray-400 font-medium'>
                  Showing {filteredFiles?.length || 0} of {files?.length || 0}{" "}
                  files
                </p>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <label className='text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase'>
                Sort By Stage:
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className='bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 text-xs font-bold rounded px-3 py-1.5 focus:outline-none focus:border-[#0F83B2] cursor-pointer transition-colors'>
                <option value='all'>All Files</option>
                <option value='pending'>Pending</option>
                <option value='in-progress'>In-Progress</option>
                <option value='qc1'>QC 1 (Checker)</option>
                <option value='qc2'>QC 2 (Final)</option>
                <option value='done'>Finished</option>
              </select>
            </div>
          </div>

          {/* files */}
          <div className='bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col'>
            <div className='p-4 bg-[#091E42] dark:bg-[#0a1929] flex justify-between items-center text-white'>
              <h3 className='text-[12px] font-bold uppercase tracking-widest flex items-center gap-2 text-blue-200'>
                <Briefcase size={14} /> Production Files ({files?.length || 0})
              </h3>
              <button className='text-[10px] bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 px-3 py-1 rounded transition-all font-bold uppercase'>
                Download All
              </button>
            </div>

            <div className='p-4 grid grid-cols-1 gap-3 max-h-150 overflow-y-auto custom-scrollbar bg-gray-50 dark:bg-gray-700/20'>
              {filteredFiles && filteredFiles.length > 0 ? (
                filteredFiles.map((file) => (
                  <FileDetailsCard
                    key={file._id}
                    file={file}
                    orderId={orderId}
                    refetch={refetch}
                    onViewLogs={(logs) => {
                      setSelectedLogs(logs);
                      document.getElementById("logs_modal").showModal();
                    }}
                  />
                ))
              ) : (
                <div className='text-center py-20 text-gray-500 dark:text-gray-500 italic bg-white dark:bg-gray-700/30 rounded border border-dashed border-gray-300 dark:border-gray-600'>
                  No files found for this{" "}
                  {filterStatus === "all" ? "project" : "Stage"}.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <StageLogModal id={`logs_modal`} stageLogs={selectedLogs} />
    </div>
  );
};

export default ProjectDetails;
