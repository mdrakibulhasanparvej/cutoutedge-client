import React from "react";
import {
  FiClock,
  FiPlayCircle,
  FiLoader,
  FiCheckCircle,
  FiAlertTriangle,
  FiXCircle,
  FiImage,
  FiArrowUpRight,
} from "react-icons/fi";

const StatsCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className='bg-white rounded-md border border-gray-200 p-4 hover:-translate-y-1 transition-all duration-300'>
    <div className='flex items-center justify-between'>
      <div>
        <p className='text-sm text-gray-500 font-medium'>{title}</p>
        <p className='text-2xl md:text-3xl font-bold mt-1 text-gray-900'>
          {value}
        </p>
      </div>

      <div className={`p-3 md:p-4 rounded-xl ${color} bg-opacity-90`}>
        <Icon size={26} className='text-white' />
      </div>
    </div>

    {trend && (
      <div className='mt-3 text-xs flex items-center gap-1'>
        <FiArrowUpRight
          size={14}
          className={trend.positive ? "text-green-600" : "text-red-600"}
        />
        <span className={trend.positive ? "text-green-600" : "text-red-600"}>
          {trend.value}
        </span>
        <span className='text-gray-500'>vs yesterday</span>
      </div>
    )}
  </div>
);

/* ================================
   Status Bar
================================ */
const StatusBar = ({ label, count, total, color }) => {
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <div className='w-full min-w-35'>
      <div className='flex justify-between text-xs md:text-sm mb-1.5'>
        <span className='font-medium'>{label}</span>
        <span className='text-gray-600'>
          {count} • {percentage}%
        </span>
      </div>

      <div className='h-2 md:h-3 bg-gray-100 rounded-full overflow-hidden'>
        <div
          className={`h-full ${color} rounded-full transition-all duration-1000`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

/* ================================
   Main Page
================================ */
const StatisticsPage = ({
  stats = {
    totalOrders: 284,
    pending: 42,
    processing: 31,
    qc1: 18,
    qc2: 9,
    completed: 176,
    rejected: 8,
    totalImages: 12470,
    approvedImages: 11890,
    avgProcessingTime: "11m 42s",
    todayCompleted: 47,
    todayTrend: { value: "+18%", positive: true },
  },
}) => {
  const totalActive = stats.pending + stats.processing + stats.qc1 + stats.qc2;

  return (
    <div className='max-w-7xl mx-auto px-4 py-8 bg-white'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-xl font-bold text-gray-900'>Workflow Statistics</h1>
        <p className='text-xs  text-gray-600 mt-1'>
          Overview of all image processing orders •{" "}
          {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10'>
        <StatsCard
          title='Total Orders'
          value={stats.totalOrders}
          icon={FiImage}
          color='bg-indigo-600'
        />
        <StatsCard
          title='Active Orders'
          value={totalActive}
          icon={FiLoader}
          color='bg-blue-600'
        />
        <StatsCard
          title='Completed Today'
          value={stats.todayCompleted}
          icon={FiCheckCircle}
          color='bg-green-600'
          trend={stats.todayTrend}
        />
        <StatsCard
          title='Avg Time'
          value={stats.avgProcessingTime}
          icon={FiClock}
          color='bg-amber-600'
        />
      </div>

      {/* Pipeline */}
      <div className='bg-white rounded-md border border-gray-200 p-6 mb-10'>
        <h2 className='text-lg font-semibold mb-5 flex items-center gap-2'>
          <FiPlayCircle className='text-blue-600' />
          Current Pipeline Status
        </h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5'>
          <StatusBar
            label='Pending'
            count={stats.pending}
            total={stats.totalOrders}
            color='bg-amber-500'
          />
          <StatusBar
            label='Processing'
            count={stats.processing}
            total={stats.totalOrders}
            color='bg-blue-500'
          />
          <StatusBar
            label='QC-1'
            count={stats.qc1}
            total={stats.totalOrders}
            color='bg-purple-500'
          />
          <StatusBar
            label='QC-2'
            count={stats.qc2}
            total={stats.totalOrders}
            color='bg-indigo-500'
          />
          <StatusBar
            label='Completed'
            count={stats.completed}
            total={stats.totalOrders}
            color='bg-green-500'
          />
        </div>
      </div>

      {/* Bottom Grid */}
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
        {/* Quality */}
        <div className='bg-white rounded-md border border-gray-200 p-6 '>
          <h3 className='text-lg font-semibold mb-5 flex items-center gap-2'>
            <FiCheckCircle className='text-green-600' />
            Quality Overview
          </h3>

          <div className='space-y-5'>
            <div className='flex justify-between text-sm'>
              <span>Approval Rate</span>
              <span className='text-xl font-bold text-green-700'>
                {Math.round((stats.approvedImages / stats.totalImages) * 100)}%
              </span>
            </div>
            <div className='flex justify-between text-sm'>
              <span>Rejected Images</span>
              <span className='text-xl font-bold text-red-600'>
                {stats.totalImages - stats.approvedImages}
              </span>
            </div>
            <div className='flex justify-between text-sm'>
              <span>Critical Issues (QC-2)</span>
              <span className='text-xl font-bold text-amber-700'>~12</span>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className='bg-white rounded-md border border-gray-200 p-6'>
          <h3 className='text-lg font-semibold mb-5 flex items-center gap-2'>
            <FiAlertTriangle className='text-amber-600' />
            Current Alerts
          </h3>

          <div className='space-y-3'>
            <div className='flex gap-3 p-3 bg-amber-50 rounded-lg'>
              <FiAlertTriangle className='text-amber-600' size={20} />
              <div>
                <p className='font-medium text-sm'>
                  High priority orders pending
                </p>
                <p className='text-xs text-gray-600'>
                  8 orders waiting &gt; 4 hours
                </p>
              </div>
            </div>

            <div className='flex gap-3 p-3 bg-red-50 rounded-lg'>
              <FiXCircle className='text-red-600' size={20} />
              <div>
                <p className='font-medium text-sm'>QC-2 rejection rate</p>
                <p className='text-xs text-gray-600'>12.4% (above threshold)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
