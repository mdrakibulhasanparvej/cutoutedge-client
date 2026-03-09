import React from "react";
import useTitle from "../../hooks/useTitle";
// import StatisticsPage from "../DesignWork/StatisticsPage";
import useUser from "../../hooks/useUser";
import StatisticsPage from "../statistics/StatisticsPage";

const Statistics = () => {
  useTitle("Statistics");

  const { avatar, name, role, isLoading, email } = useUser();

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <p className='text-lg font-semibold animate-pulse'>
          Loading user data...
        </p>
      </div>
    );
  }

  if (!email) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <p className='text-red-500'>User record not found in database.</p>
      </div>
    );
  }

  return (
    <div className='p-6'>
      <div className='flex items-center gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6'>
        <img
          src={avatar}
          alt={name}
          className='w-16 h-16 rounded-full border-2 border-[#0F83B2] object-cover'
        />
        <div>
          <h1 className='text-2xl font-bold text-[#172B4D] dark:text-white'>
            Welcome, {name}!
          </h1>
          <p className='text-sm text-gray-500 uppercase tracking-wider font-medium dark:text-gray-300'>
            Role: {role}
          </p>
        </div>
      </div>

      <div className='mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6'>
        {role === "designer" && (
          <p className='p-4 text-gray-700 dark:text-gray-300'>
            Designer Overview Content
          </p>
        )}
        {role === "admin" && (
          // <p className='p-4 bg-green-50'>Designer Task Overview</p>
          <StatisticsPage />
        )}
      </div>
    </div>
  );
};

export default Statistics;
