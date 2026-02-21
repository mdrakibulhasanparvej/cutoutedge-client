import React from "react";
import useTitle from "../../../hook/useTitle";
// import StatisticsPage from "../DesignWork/StatisticsPage"; // যদি প্রয়োজন হয়
import useUser from "../../../hook/useUser";
import StatisticsPage from "../statistics/StatisticsPage";

const Statistics = () => {
  useTitle("Statistics");

  // ১. role এবং userEmail ও ডিইস্ট্রাকচার করে নিন (যেহেতু নিচে কনসোলে ব্যবহার করেছেন)
  const { avatar, userName, userEmail, role, isLoading, dbUser } = useUser();

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <p className='text-lg font-semibold animate-pulse'>
          Loading user data...
        </p>
      </div>
    );
  }

  // ২. যদি ডাটাবেসে ইউজার না থাকে তবে একটি ক্লিনিং মেসেজ
  if (!dbUser) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <p className='text-red-500'>User record not found in database.</p>
      </div>
    );
  }

  // ৩. এখন কনসোল লগ কাজ করবে
  console.log("Dashboard User Data:", { avatar, userName, userEmail, role });

  return (
    <div className='p-6'>
      {/* ইউজার ওয়েলকাম সেকশন */}
      <div className='flex items-center gap-4 bg-white p-6 rounded-lg shadow-sm mb-6'>
        <img
          src={avatar}
          alt={userName}
          className='w-16 h-16 rounded-full border-2 border-[#0F83B2] object-cover'
        />
        <div>
          <h1 className='text-2xl font-bold text-[#172B4D]'>
            Welcome, {userName}!
          </h1>
          <p className='text-sm text-gray-500 uppercase tracking-wider font-medium'>
            Role: {role}
          </p>
        </div>
      </div>

      {/* কন্টেন্ট এরিয়া */}
      <div className='mt-8'>
        {/* আপনি আপনার রোল অনুযায়ী কম্পোনেন্ট এখানে রেন্ডার করতে পারেন */}
        {role === "admin" && (
          <p className='p-4 bg-blue-50'>Admin Overview Content</p>
        )}
        {role === "designer" && (
          // <p className='p-4 bg-green-50'>Designer Task Overview</p>
          <StatisticsPage />
        )}
      </div>
    </div>
  );
};

export default Statistics;
