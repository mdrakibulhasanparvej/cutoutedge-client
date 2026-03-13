import React, { useState } from "react";
import { Clock, PlayCircle, SearchCheck, ShieldCheck, CheckCircle2, KanbanSquare } from "lucide-react";

import Pending from "../../components/design-tabs/pending/Pending";
import InProgress from "../../components/design-tabs/in-progress/InProgress";
import QualityControl from "../../components/design-tabs/qc-1/QualityControl";
import QualityControl2 from "../../components/design-tabs/qc-2/QualityControl2";
import Finished from "../../components/design-tabs/finished/Finished";

const DesignOnline = () => {

  const [activeTab, setActiveTab] = useState("Pending");

  const tabData = [
    { label: "Pending", icon: Clock, Comp: Pending },
    { label: "InProgress", icon: PlayCircle, Comp: InProgress },
    { label: "QualityControl", icon: SearchCheck, Comp: QualityControl },
    { label: "QualityControl2", icon: ShieldCheck, Comp: QualityControl2 },
    { label: "Finished", icon: CheckCircle2, Comp: Finished },
  ];

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
                className={`group cursor-pointer  flex items-center gap-2 py-3 border-b-[3px] transition-all whitespace-nowrap text-[15px]
                    ${isActive
                    ? "border-[#0F83B2] text-[#0F83B2] font-medium"
                    : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-t-md px-1"
                  }`}>
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
