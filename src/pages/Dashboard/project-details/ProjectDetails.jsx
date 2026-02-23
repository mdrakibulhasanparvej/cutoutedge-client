import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import FileDetailsCard from "./FileDetailsCard";
import Deadline from "../common/Deadline";
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
import useUser from "../../../hook/useUser";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { name } = useUser()


  const { isPending, data: order } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/files/order/${encodeURIComponent(orderId)}`);
      return res.data || [];
    },
    staleTime: 60000,
  });

  if (isPending)
    return (
      <div className='flex h-screen items-center justify-center bg-[#F4F5F7]'>
        <div className='flex flex-col items-center gap-2'>
          <span className='loading loading-spinner text-[#0F83B2] loading-lg'></span>
          <p className='text-xs font-bold text-gray-400 uppercase tracking-widest'>
            Loading Order...
          </p>
        </div>
      </div>
    );

  const { instructions, categories, deadline, createdAt, priority, files } =
    order?.data || {};


  return (
    <div className='min-h-screen bg-[#F4F5F7] p-4 font-sans text-[#172B4D]'>
      {/* Top Navigation */}
      <div className='max-w-7xl mx-auto flex items-center justify-between mb-4'>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-[#0F83B2] transition-all bg-white px-3 py-1.5 rounded border border-gray-200 shadow-sm'>
          <ChevronLeft size={14} /> BACK TO LIST
        </button>
      </div>

      <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5'>
        {/* === LEFT SIDEBAR === */}
        <div className='lg:col-span-3 space-y-4'>
          {/* Main ID & Status Card */}
          <div className='bg-white rounded border border-gray-200 shadow-sm overflow-hidden'>
            <div className='p-5 space-y-4'>
              <div className='flex justify-between items-start'>
                <h1 className='text-2xl font-bold text-[#0F83B2] tracking-tight leading-none'>
                  {orderId}
                </h1>
                <button className='text-gray-300 hover:text-gray-500 transition-colors'>
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


              <div className='bg-rose-50 border border-rose-100 rounded-md p-3'>
                <p className='text-[10px] font-bold text-rose-400 uppercase leading-none mb-1.5 tracking-wider'>
                  Time Remaining
                </p>
                <div className='text-lg font-black text-rose-600 leading-none'>
                  <Deadline createdAt={createdAt} orderDeadline={deadline} />
                </div>
              </div>

              {/* Metadata */}
              <div className='space-y-2.5 text-[12px] pt-3 border-t border-gray-50'>
                <div className='flex items-center gap-2 text-gray-600'>
                  <User size={14} className='text-gray-400' />
                  <span className='font-medium truncate text-[11px]'>
                    User: {name}
                  </span>
                </div>
                <div className='flex items-center gap-2 text-gray-500 text-[11px]'>
                  <Clock size={14} className='text-gray-300' />
                  <span>
                    <strong>Recv:</strong>{" "}
                    {new Date(createdAt).toLocaleDateString("en-GB")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details Card */}
          <div className='bg-white rounded border border-gray-200 p-5 shadow-sm space-y-5'>
            <div>
              <label className='text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-3'>
                <Layers size={12} className='text-[#0F83B2]' /> Categories
              </label>
              <div className='flex flex-wrap gap-1.5'>
                {categories?.map((cat, i) => (
                  <span
                    key={i}
                    className='bg-blue-50 text-[#0F83B2] px-2 py-0.5 rounded border border-blue-100 text-[10px] font-bold'>
                    {cat}
                  </span>
                )) || (
                    <span className='text-gray-400 italic text-[11px]'>
                      No category
                    </span>
                  )}
              </div>
            </div>

            <div className='pt-3 space-y-2.5 border-t border-gray-50'>
              <div className='flex justify-between text-[11px]'>
                <span className='text-gray-400 font-bold uppercase tracking-tighter'>
                  Format:
                </span>
                <span className='font-bold text-gray-700'>PSD / Layers</span>
              </div>
              <div className='flex justify-between text-[11px]'>
                <span className='text-gray-400 font-bold uppercase tracking-tighter'>
                  Files:
                </span>
                <span className='font-bold text-[#0F83B2]'>
                  {files?.length || 0} Total
                </span>
              </div>
            </div>

            <div>
              <label className='text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-2'>
                <Tag size={12} className='text-[#0F83B2]' /> Status Tags
              </label>
              <div className='flex gap-1'>
                <span className='bg-green-50 text-green-600 border border-green-100 px-2 py-0.5 rounded text-[10px] font-bold uppercase'>
                  Ready
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* === RIGHT AREA === */}
        <div className='lg:col-span-9 space-y-5'>
          <div className='bg-white rounded border border-gray-200 shadow-sm overflow-hidden'>
            <div className='p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center'>
              <h3 className='flex items-center gap-2 text-[12px] font-bold text-gray-500 uppercase tracking-widest'>
                <FileText size={14} className='text-[#0F83B2]' /> Production
                Instructions
              </h3>
              <Edit2
                size={14}
                className='text-gray-300 cursor-pointer hover:text-[#0F83B2] transition-colors'
              />
            </div>
            <div className='p-5'>
              <div className='bg-[#FFF9E6] p-4 rounded text-[13px] text-[#856404] leading-relaxed border border-[#FFEEBA] italic shadow-sm'>
                {instructions ||
                  "No additional instructions provided for this order."}
              </div>
            </div>
          </div>

          <div className='bg-white rounded border border-gray-200 shadow-sm overflow-hidden flex flex-col'>
            <div className='p-4 bg-[#091E42] flex justify-between items-center text-white'>
              <h3 className='text-[12px] font-bold uppercase tracking-widest flex items-center gap-2 text-blue-200'>
                <Briefcase size={14} /> Production Files ({files?.length || 0})
              </h3>
              <button className='text-[10px] bg-white/10 hover:bg-white/20 px-3 py-1 rounded transition-all font-bold uppercase'>
                Download All
              </button>
            </div>

            <div className='p-4 grid grid-cols-1 gap-3 max-h-150 overflow-y-auto custom-scrollbar bg-gray-50/50'>
              {files && files.length > 0 ? (
                files.map((file) => (
                  <FileDetailsCard key={file._id} file={file} orderId={orderId} />
                ))
              ) : (
                <div className='text-center py-20 text-gray-400 italic bg-white rounded border border-dashed border-gray-200'>
                  No files found for this project.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
