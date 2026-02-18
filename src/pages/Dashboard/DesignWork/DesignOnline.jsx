import React, { useState } from "react";
// আইকন ইমপোর্ট (lucide-react থেকে)
import {
  Globe,
  ChartGantt,
  KanbanSquare,
  CalendarDays,
  ListTodo,
  Target,
  Code2,
  Terminal,
  MoreHorizontal,
  Plus,
  Users,
  Share2,
  Zap,
  Maximize2,
} from "lucide-react";

import Pending from "./Pending";
import InProgress from "./InProgress";
import QualityControl from "./QualityControl";
import QualityControl2 from "./QualityControl2";
import Finished from "./Finished";

const DesignOnline = () => {
  // ডিফল্ট ট্যাব 'Pending' রাখলাম
  const [activeTab, setActiveTab] = useState("Pending");

  // আপনার কম্পোনেন্টগুলোকে স্ক্রিনশটের নাম অনুযায়ী ম্যাপ করা হয়েছে
  const tabData = [
    { label: "Pending", icon: Globe, Comp: Pending },
    { label: "InProgress", icon: ChartGantt, Comp: InProgress },
    { label: "QualityControl", icon: KanbanSquare, Comp: QualityControl },
    { label: "QualityControl2", icon: CalendarDays, Comp: QualityControl2 },
    { label: "Finished", icon: ListTodo, Comp: Finished },
  ];

  // Active Component বের করা
  const activeItem = tabData.find((t) => t.label === activeTab);
  const ActiveComp = activeItem ? activeItem.Comp : Pending;

  return (
    <div className='min-h-screen bg-white'>
      {/* --- Top Header Section (Screenshot Style) --- */}
      <div className='flex items-center justify-between px-6 py-4'>
        <div className='flex items-center gap-4'>
          {/* Project Icon */}
          <div className='w-10 h-10 rounded bg-[#FF5630] flex items-center justify-center text-white shadow-sm'>
            <KanbanSquare size={24} fill='white' />
          </div>

          {/* Title Area */}
          <div>
            <div className='flex items-center gap-2 text-sm text-gray-500 mb-0.5'>
              <span>Dashboard</span>
              <span>/</span>
              <span>Work Space</span>
            </div>
            <div className='flex items-center gap-3'>
              <h1 className='font-semibold text-xl text-gray-900 tracking-tight'>
                Work Space
              </h1>
              {/* Team/People Icon */}
              <button className='p-1 hover:bg-gray-100 rounded text-gray-500'>
                <Users size={18} />
              </button>
              {/* Menu Dots */}
              <button className='p-1 hover:bg-gray-100 rounded text-gray-500'>
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side Tools */}
        <div className='flex items-center gap-3 text-gray-500'>
          <button className='p-2 hover:bg-gray-100 rounded transition-colors'>
            <Share2 size={20} />
          </button>
          <button className='p-2 hover:bg-gray-100 rounded transition-colors'>
            <Zap size={20} />
          </button>
          <button className='p-2 hover:bg-gray-100 rounded transition-colors'>
            <Maximize2 size={20} />
          </button>
        </div>
      </div>

      {/* --- Tab Navigation Bar (Updated) --- */}
      <div className='flex items-center px-6 border-b border-gray-200 overflow-x-auto no-scrollbar'>
        <div className='flex items-center gap-6 w-full'>
          {tabData.map((tab) => {
            const isActive = activeTab === tab.label;
            const Icon = tab.icon;

            return (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`
                    group flex items-center gap-2 py-3 border-b-[3px] transition-all whitespace-nowrap text-[15px]
                    ${
                      isActive
                        ? "border-[#0F83B2] text-[#0F83B2] font-medium" // Active: Blue color & border
                        : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-t-md px-1" // Inactive
                    }
                `}>
                <Icon
                  size={18}
                  className={
                    isActive
                      ? "text-[#0F83B2]"
                      : "text-gray-500 group-hover:text-gray-700"
                  }
                />
                {tab.label}
              </button>
            );
          })}

          {/* "More" Dropdown & Plus Button (Visual Only) */}
          <div className='flex items-center gap-2 ml-auto pl-4'>
            <button className='flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-sm font-medium transition-colors'>
              More{" "}
              <span className='bg-gray-300 text-gray-800 text-xs px-1.5 rounded-full'>
                3
              </span>
            </button>
            <button className='p-1.5 hover:bg-gray-200 rounded text-gray-600'>
              <Plus size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* --- Filter / Breadcrumb Section (Optional - kept simple) --- */}
      <div className='px-6 py-4 flex items-center gap-4'>
        <div className='relative'>
          <input
            type='text'
            placeholder='Search this board'
            className='pl-3 pr-8 py-1.5 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm w-48'
          />
        </div>
        <div className='flex -space-x-2'>
          {/* Dummy User Avatars */}
          <div className='w-8 h-8 rounded-full bg-blue-500 border-2 border-white text-white text-xs flex items-center justify-center'>
            AB
          </div>
          <div className='w-8 h-8 rounded-full bg-green-500 border-2 border-white text-white text-xs flex items-center justify-center'>
            CD
          </div>
          <button className='w-8 h-8 rounded-full bg-gray-100 border-2 border-white text-gray-500 flex items-center justify-center hover:bg-gray-200'>
            +
          </button>
        </div>
        <span className='text-gray-300'>|</span>
        <button className='text-gray-600 text-sm font-medium hover:underline'>
          Only my issues
        </button>
        <button className='text-gray-600 text-sm font-medium hover:underline'>
          Recently updated
        </button>
      </div>

      {/* --- Main Content Area --- */}
      <div className='bg-white min-h-[calc(100vh-180px)] p-6'>
        {/* এখানে ৫টি কম্পোনেন্ট লুপ হচ্ছে যেমন আপনার কোডে ছিল */}
        <div className='space-y-5'>
          {Array.from({ length: 5 }).map((_, index) => (
            <ActiveComp key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesignOnline;
