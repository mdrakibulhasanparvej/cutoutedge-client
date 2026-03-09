import React, { useState } from "react";
// আইকন ইমপোর্ট (lucide-react থেকে)
import {
  Clock, // Pending এর জন্য
  PlayCircle, // InProgress এর জন্য
  SearchCheck, // QualityControl এর জন্য
  ShieldCheck, // QualityControl2 এর জন্য
  CheckCircle2, // Finished এর জন্য
  MoreHorizontal,
  Plus,
  Users,
  Share2,
  Zap,
  Maximize2,
  KanbanSquare,
} from "lucide-react";
import Pending from "./pending/Pending";
import InProgress from "./in-progress/InProgress";
import QualityControl from "./qc-1/QualityControl";
import QualityControl2 from "./qc-2/QualityControl2";
import Finished from "./finished/Finished";

// import Pending from "./Pending";
// import InProgress from "./in-progress/InProgress";
// import QualityControl from "./qc-1/QualityControl";
// import QualityControl2 from "./qc-2/QualityControl2";
// import Finished from "./finished/Finished";

const DesignOnline = () => {
  // ডিফল্ট ট্যাব 'Pending'
  const [activeTab, setActiveTab] = useState("Pending");

  // কম্পোনেন্টগুলোকে নাম অনুযায়ী ম্যাপ করা হয়েছে
  const tabData = [
    { label: "Pending", icon: Clock, Comp: Pending },
    { label: "InProgress", icon: PlayCircle, Comp: InProgress },
    { label: "QualityControl", icon: SearchCheck, Comp: QualityControl },
    { label: "QualityControl2", icon: ShieldCheck, Comp: QualityControl2 },
    { label: "Finished", icon: CheckCircle2, Comp: Finished },
  ];

  // Active Component বের করা
  const activeItem = tabData.find((t) => t.label === activeTab);
  const ActiveComp = activeItem ? activeItem.Comp : Pending;

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      {/* --- Top Header Section (Screenshot Style) --- */}
      <div className='flex items-center justify-between px-6 py-4'>
        <div className='flex items-center gap-4'>
          {/* Project Icon */}
          <div className='w-10 h-10 rounded bg-[#FF5630] flex items-center justify-center text-white shadow-sm'>
            <KanbanSquare size={24} fill='white' />
          </div>

          {/* Title Area */}
          <div>
            <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-0.5'>
              <span>Dashboard</span>
              <span>/</span>
              <span>Work Space</span>
            </div>
            <div className='flex items-center gap-3'>
              <h1 className='font-semibold text-xl text-gray-800 dark:text-gray-100 tracking-tight'>
                Work Space
              </h1>
            </div>
          </div>
        </div>

        {/* Right Side Tools */}
        {/* <div className='flex items-center gap-3 text-gray-500'>
          <button className='p-2 hover:bg-gray-100 rounded transition-colors'>
            <Share2 size={20} />
          </button>
          <button className='p-2 hover:bg-gray-100 rounded transition-colors'>
            <Zap size={20} />
          </button>
          <button className='p-2 hover:bg-gray-100 rounded transition-colors'>
            <Maximize2 size={20} />
          </button>
        </div> */}
      </div>

      {/* --- Tab Navigation Bar (Updated) --- */}
      <div className='flex items-center px-6 border-b border-gray-200 dark:border-gray-700 overflow-x-auto no-scrollbar'>
        <div className='flex items-center gap-6 w-full'>
          {tabData.map((tab) => {
            const isActive = activeTab === tab.label;
            const Icon = tab.icon;

            return (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`
                    group cursor-pointer  flex items-center gap-2 py-3 border-b-[3px] transition-all whitespace-nowrap text-[15px]
                    ${
                      isActive
                        ? "border-[#0F83B2] text-[#0F83B2] font-medium" // Active: Blue color & border
                        : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-t-md px-1" // Inactive
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
          {/* <div className='flex items-center gap-2 ml-auto pl-4'>
            <button className='flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-sm font-medium transition-colors'>
              More{" "}
              <span className='bg-gray-300 text-gray-800 text-xs px-1.5 rounded-full'>
                3
              </span>
            </button>
            <button className='p-1.5 hover:bg-gray-200 rounded text-gray-600'>
              <Plus size={20} />
            </button>
          </div> */}
        </div>
      </div>

      {/* --- Filter / Breadcrumb Section (Optional - kept simple) --- */}
      <div className='px-6 py-4 flex items-center gap-4'>
        <div className='relative'>
          <input
            type='text'
            placeholder='Search this board'
            className='pl-3 pr-8 py-1.5 border bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 text-sm w-48'
          />
        </div>

        <div className='flex items-center gap-2'>
          <button className='flex items-center gap-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded text-sm font-medium transition-colors'>
            Filter
          </button>
          <button className='flex items-center gap-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded text-sm font-medium transition-colors'>
            Sort
          </button>
        </div>
      </div>

      {/* --- Main Content Area --- */}
      <div className='bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-180px)] p-6'>
        <div className='space-y-5'>
          <ActiveComp />
        </div>
      </div>
    </div>
  );
};

export default DesignOnline;
