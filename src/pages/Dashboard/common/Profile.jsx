import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import {
  Briefcase,
  Network,
  Building2,
  MapPin,
  Mail,
  Plus,
  Trophy,
  ClipboardList,
  Users,
} from "lucide-react";

// আপনার কম্পোনেন্টগুলো
import Pending from "../DesignWork/Pending";
import InProgress from "../DesignWork/InProgress";
import StatsCard from "../../../component/shared/Cards/StatsCard";
import useUser from "../../../hook/useUser"; // useUser ইম্পোর্ট করা হলো

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  // useUser থেকে ডাটা আনা হলো
  const { avatar, userName, userEmail, role, isLoading, dbUser } = useUser();

  if (isLoading) {
    return (
      <div className='min-h-screen flex justify-center items-center bg-white'>
        <p className='animate-pulse font-medium text-gray-500'>
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className='bg-white min-h-screen font-sans text-[#172b4d]'>
      {/* --- Top Banner Section --- */}
      <div className='bg-white border-b border-gray-200'>
        <div className='relative h-48 bg-[#091e42] overflow-hidden'>
          <div className='absolute inset-0 opacity-40 bg-gradient-to-r from-blue-600 to-purple-600'></div>
          <div className='absolute right-10 top-10 text-white text-right'>
            <h1 className='text-2xl font-bold tracking-widest uppercase'>
              {userName || "User Name"} {/* ডাইনামিক নাম */}
            </h1>
            <p className='text-sm opacity-80 font-medium uppercase'>
              {role || "Member"} {/* ডাইনামিক রোল */}
            </p>
          </div>
        </div>

        <div className='max-w-7xl mx-auto px-8 relative pb-6'>
          <div className='absolute -top-16 left-8'>
            <div className='w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-100 shadow-sm'>
              <img
                src={avatar || "https://via.placeholder.com/150"} // ডাইনামিক অ্যাভাটার
                alt='Profile'
                className='w-full h-full object-cover'
              />
            </div>
          </div>

          <div className='pt-20 flex justify-between items-end'>
            <div>
              <h2 className='text-2xl font-semibold'>{userName}</h2>
              <div className='flex gap-2 mt-1'>
                <span className='px-2 py-0.5 text-xs rounded-md bg-blue-50 text-blue-700 font-medium border border-blue-100 capitalize'>
                  {role}
                </span>
                <span className='px-2 py-0.5 text-xs rounded-md bg-green-50 text-green-700 font-medium border border-green-100'>
                  Active
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className='px-4 py-1.5 border border-gray-200 rounded-md font-medium text-sm hover:bg-gray-50 transition-colors shadow-sm'>
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        </div>
      </div>

      {/* --- Main Grid Content --- */}
      <div className='max-w-7xl mx-auto px-8 py-8 grid grid-cols-12 gap-8'>
        {/* === Left Sidebar === */}
        <div className='col-span-12 lg:col-span-3 space-y-6'>
          <section className='bg-white p-5 rounded-md border border-gray-200 shadow-sm'>
            <h3 className='font-semibold mb-4 border-b border-gray-100 pb-2 text-gray-700'>
              About
            </h3>
            <div className='space-y-4 text-sm text-gray-600'>
              <div className='flex items-center gap-3'>
                <Briefcase size={16} className='text-gray-400' />{" "}
                {role === "designer" ? "Graphic Designer" : "Web Developer"}
              </div>
              <div className='flex items-center gap-3 italic'>
                <Network size={16} className='text-gray-400' />{" "}
                {dbUser?.age ? `${dbUser.age} years old` : "Age not set"}
              </div>
              <div className='flex items-center gap-3'>
                <Building2 size={16} className='text-gray-400' /> Cutout Edge
              </div>
              <div className='flex items-center gap-3'>
                <MapPin size={16} className='text-gray-400' /> Dhaka, Bangladesh
              </div>
            </div>
          </section>

          {/* ... Date Filter Section (অপরিবর্তিত) ... */}
          <section className='bg-white p-5 rounded-md border border-gray-200 shadow-sm'>
            <h4 className='text-xs font-bold text-gray-500 uppercase tracking-wider mb-4'>
              Date Filter
            </h4>
            <div className='space-y-3'>
              <div>
                <label className='text-[11px] font-bold text-gray-400'>
                  FROM
                </label>
                <input
                  type='date'
                  className='w-full mt-1 p-2 border border-gray-200 rounded-md text-sm outline-none focus:border-blue-400'
                />
              </div>
              <div>
                <label className='text-[11px] font-bold text-gray-400'>
                  TO
                </label>
                <input
                  type='date'
                  className='w-full mt-1 p-2 border border-gray-200 rounded-md text-sm outline-none focus:border-blue-400'
                />
              </div>
            </div>
          </section>

          <section className='bg-white p-5 rounded-md border border-gray-200 shadow-sm'>
            <h4 className='text-xs font-bold text-gray-500 uppercase tracking-wider mb-3'>
              Contact
            </h4>
            <div className='flex items-center gap-3 text-sm text-blue-600 truncate'>
              <Mail size={16} className='text-gray-400 shrink-0' />
              {userEmail} {/* ডাইনামিক ইমেইল */}
            </div>
          </section>
        </div>

        {/* === Right Content === */}
        <div className='col-span-12 lg:col-span-9 space-y-6'>
          {/* Stats Cards */}
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
            <StatsCard
              title='In-Progress'
              value='0'
              icon={ClipboardList}
              color='bg-indigo-600'
            />
            <StatsCard
              title='Completed'
              value='0'
              icon={Plus}
              color='bg-green-600'
            />
            <StatsCard
              title='Rejected'
              value='0'
              icon={Trophy}
              color='bg-red-600'
            />
            <StatsCard
              title='Total Projects'
              value='0'
              icon={Users}
              color='bg-blue-600'
            />
          </div>

          {/* Tabs Section */}
          <div className='bg-white border border-gray-200 rounded-md p-6 shadow-sm'>
            <div className='flex justify-between items-center mb-6'>
              <h3 className='font-semibold text-lg'>Today's Projects (0)</h3>
              <span className='text-xs text-gray-400 italic font-medium'>
                Last updated: Just now
              </span>
            </div>

            <Tabs className='jira-tabs'>
              <TabList className='flex gap-6 border-b border-gray-200 mb-6 overflow-x-auto no-scrollbar'>
                {[
                  "Pending",
                  "In-Progress",
                  "Finished",
                  "Completed",
                  "Rejected",
                ].map((tab) => (
                  <Tab
                    key={tab}
                    className='pb-3 cursor-pointer text-sm font-medium text-gray-500 outline-none transition-all hover:text-blue-600 border-b-2 border-transparent'
                    selectedClassName='!text-blue-600 !border-blue-600'>
                    {tab}
                  </Tab>
                ))}
              </TabList>

              <TabPanel>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className='space-y-3'>
                  <Pending />
                </motion.div>
              </TabPanel>

              <TabPanel>
                <div className='space-y-3'>
                  <InProgress />
                </div>
              </TabPanel>

              <TabPanel>
                <div className='py-10 text-center text-gray-400 text-sm border border-dashed border-gray-200 rounded-md'>
                  No data available in this section
                </div>
              </TabPanel>
            </Tabs>
          </div>

          {/* Reporting Line */}
          <div className='bg-white border border-gray-200 rounded-md p-6 shadow-sm text-center'>
            <h3 className='font-semibold text-left mb-6'>Reporting line</h3>
            <div className='flex flex-col items-center py-6'>
              <Users size={40} className='text-gray-100 mb-2' />
              <p className='text-sm text-gray-400 max-w-md'>
                No direct reports or manager assigned yet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
