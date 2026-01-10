import React from 'react';
import {
  MdMenu,
  MdSearch,
  MdMail,
  MdNotifications,
  MdAccountCircle
} from 'react-icons/md';

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="bg-blue-700 text-white shadow-md top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Left - Menu + Logo */}
          <div className="flex items-center gap-3">
            <button
              className="p-2 rounded-full hover:bg-blue-600 transition-colors"
              aria-label="menu"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <MdMenu size={28} />
            </button>

            <span className="text-xl font-semibold tracking-tight hidden sm:block">
              MUI
            </span>
          </div>

          {/* Center - Search */}
          <div className="flex-1 max-w-xl mx-4 md:mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdSearch className="text-blue-200" size={22} />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-full pl-11 pr-4 py-2 rounded-full 
                         bg-blue-600 bg-opacity-40 
                         text-white placeholder-blue-200 
                         focus:outline-none focus:ring-2 focus:ring-blue-300 
                         focus:bg-opacity-60 transition-all duration-200"
              />
            </div>
          </div>

          {/* Right - Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              className="p-2 rounded-full hover:bg-blue-600 relative transition-colors"
              aria-label="messages"
            >
              <MdMail size={24} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white 
                             text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                4
              </span>
            </button>

            <button
              className="p-2 rounded-full hover:bg-blue-600 relative transition-colors"
              aria-label="notifications"
            >
              <MdNotifications size={24} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white 
                             text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                17
              </span>
            </button>

            <button
              className="p-1.5 rounded-full hover:bg-blue-600 transition-colors"
              aria-label="account"
            >
              <MdAccountCircle size={32} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Navbar;