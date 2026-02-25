  import React, { useState } from "react";
  import { Link, Outlet, useNavigate } from "react-router";
  import { CgProfile } from "react-icons/cg";
  import {
    MdClose,
    MdDarkMode,
    MdLightMode,
    MdMenu,
    MdOutlineDesignServices,
  } from "react-icons/md";
  import { BsGraphUp } from "react-icons/bs";
  import { GrLogout } from "react-icons/gr";
  import { FaBell } from "react-icons/fa";
  import MenuItem from "../component/Dashboard/MenuItem/MenuItem";
  import useAuth from "../hook/useAuth";
  import useUser from "../hook/useUser";
  import MyAlert from "../pages/Dashboard/common/MyAler";

  const DashboardLayout = () => {
    const navigate = useNavigate();
    // const location = useLocation();
    const { logOut } = useAuth();
    const { name, role, avatar } = useUser();

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [notificationCount, setNotificationCount] = useState(5);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    const handleTheme = (isDark) => {
      const newTheme = isDark ? "dark" : "light";
      setTheme(newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    };

    const handleLogOut = () => {
      logOut();
      navigate("/auth/login");
      MyAlert({
        title: "Success",
        text: "You have been Logged out",
      });
    };

    return (
      <div className="h-screen w-full flex overflow-hidden bg-gray-100 dark:bg-gray-900 transition-colors font-sans">
        {/* === SIDEBAR === */}
        <aside
          className={`transition-all duration-300 bg-white dark:bg-gray-800 flex flex-col border-r border-gray-200 dark:border-gray-700 h-full shrink-0 z-30
          ${sidebarOpen ? "w-64" : "w-0 lg:w-20"}`}
        >
          {/* Sidebar Header */}
          <div className="h-16 flex items-center justify-between px-4 shrink-0 border-b border-gray-50 dark:border-gray-700">
            <Link to="/dashboard" className={`flex items-center gap-3 transition-opacity duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 lg:opacity-100"}`}>
              <img src="/Logo-01-1-2048x418.webp" alt="Logo" className="" />
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1">
              <MdClose className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 space-y-2 custom-scrollbar">
            <MenuItem
              icon={BsGraphUp}
              label={sidebarOpen ? "Statistics" : ""}
              address="/dashboard"
            />
            <MenuItem
              icon={MdOutlineDesignServices}
              label={sidebarOpen ? "Designs-online" : ""}
              address="design-online"
            />
            <MenuItem
              icon={MdOutlineDesignServices}
              label={sidebarOpen ? "Create a Project" : ""}
              address="create-project"
            />
            <MenuItem
              icon={CgProfile}
              label={sidebarOpen ? "My Profile" : ""}
              address="profile"
            />
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-700 shrink-0">
            <button
              onClick={handleLogOut}
              className={`w-full flex items-center gap-3 py-2.5 px-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-all duration-200
              ${!sidebarOpen && "justify-center"}`}
            >
              <GrLogout className="shrink-0" />
              {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
            </button>
          </div>
        </aside>

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">

          <header className="h-16 flex items-center justify-between px-4 lg:px-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shrink-0 z-20">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <MdMenu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>
            </div>

            <div className="flex items-center gap-2 lg:gap-5">
              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                <FaBell size={18} className="text-gray-600 dark:text-gray-400" />
                {notificationCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 min-w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 border-2 t border-white dark:border-gray-800">
                    {notificationCount > 99 ? "99+" : notificationCount}
                  </span>
                )}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={() => handleTheme(theme !== "dark")}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                {theme === "dark" ? (
                  <MdDarkMode className="text-yellow-400 w-5 h-5" />
                ) : (
                  <MdLightMode className="text-gray-800 w-5 h-5" />
                )}
              </button>

              {/* Vertical Divider */}
              <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>

              {/* User Profile */}
              <div className="flex items-center gap-3">
                <div className="text-right hidden md:block">
                  <p className="text-xs font-bold text-gray-800 dark:text-gray-200 leading-none mb-1">
                    {name}
                  </p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-tighter font-semibold">
                    {role}
                  </p>
                </div>
                <Link to="profile" className="shrink-0">
                  <img
                    src={avatar || "/avatar-placeholder.png"}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-[#0F83B2] object-cover hover:ring-2 hover:ring-[#0F83B2]/30 transition-all"
                  />
                </Link>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto bg-[#F4F5F7] dark:bg-gray-900 custom-scrollbar">
            <div className="min-h-full text-black">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    );
  };

  export default DashboardLayout;