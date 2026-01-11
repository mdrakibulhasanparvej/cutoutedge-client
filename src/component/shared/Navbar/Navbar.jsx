import { Link } from "react-router";
// import useAuth from "../../../hooks/useAuth";
// import Container from "../../ui/Container";
import React, { useEffect, useState } from "react";
import { PiCarSimpleFill, PiPhoneCallFill } from "react-icons/pi";
import {
  IoAddCircle,
  IoBookmarks,
  IoHome,
  IoLogIn,
  IoLogoWhatsapp,
} from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { FaListAlt, FaSearch } from "react-icons/fa";
import { MdDarkMode, MdLightMode, MdSpaceDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import MyLinks from "./MyLinks";

const Navbar = () => {
  // const { user, logOut } = useAuth();
  //   const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  // const handleLogout = () => {
  //   logOut()
  //     .then(() => {
  //       toast.success("🎉 Log out successful!", {
  //         position: "top-right",
  //         autoClose: 2000,
  //         theme: "colored",
  //       });
  //     })
  //     .catch((error) => {
  //       toast.error(`An Error: ${error.message}`, {
  //         position: "top-right",
  //         autoClose: 2000,
  //         theme: "colored",
  //       });
  //     });
  // };

  const navLinks = [
    { label: "About Us", to: "/about" },
    { label: "Contact Us", to: "/contact" },
    { label: "Feedback", to: "/feedback" },
  ];

  const links = (
    <>
      {navLinks.map((item, index) => (
        <li key={index}>
          <MyLinks to={item.to}>{item.label}</MyLinks>
        </li>
      ))}
    </>
  );

  const links2 = (
    <>
      <li>
        <MyLinks to="/dashboard">Dashborad</MyLinks>
      </li>
    </>
  );

  return (
    <div className="relative dark:bg-gray-800 ">
      <div className="navbar bg-white dark:bg-gray-800 text-gray-800 dark:text-white sticky top-0 z-50 pr-5 md:px-10 border-b border-gray-300 shadow-md">
        <div className="navbar-start  ">
          <div className="dropdown ">
            <div
              tabIndex={0}
              role="button"
              className="-pl-5 btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu bg-white dark:bg-gray-800 menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to="/" className="md:text-2xl flex items-center font-extrabold">
            <img
              src="/Logo-01-1-2048x418.webp"
              alt="Logo"
              className="w-[50%]"
            />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="font-bold menu menu-horizontal px-1">{links}</ul>
        </div>

        {/* new user icon */}
        <div className="navbar-end gap-3">
          <Link to="">
            <FaSearch />
          </Link>
          {/* {user ? ( */}
          <div className="dropdown dropdown-end z-50 ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-9 border-2 border-green-800 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  referrerPolicy="no-referrer"
                  // src={user.photoURL || avatarImg}
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu text-gray-800 dark:text-white bg-white dark:bg-gray-800 menu-sm dropdown-content rounded-box z-50 mt-3 w-60 p-2 shadow"
            >
              <div className=" pb-3 border-b border-b-gray-200">
                {/* <li className="text-sm font-bold">{user.displayName}</li>
                  <li className="text-xs">{user.email}</li> */}
              </div>
              {links2}
              <div className="px-3 flex gap-2 items-center">
                <span className="text-xl">
                  <MdLightMode />
                </span>
                <input
                  onChange={(e) => handleTheme(e.target.checked)}
                  type="checkbox"
                  defaultChecked={localStorage.getItem("theme") === "dark"}
                  className="toggle"
                />
                <span className="text-xl">
                  <MdDarkMode />
                </span>
              </div>
              <li>
                <button
                  // onClick={handleLogout}
                  className="btn mt-3 btn-xs text-left bg-linear-to-br from-[#0F83B2] to-[#36b6e9] text-white"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
          {/* // ) : ( */}
          {/* <div className="flex gap-2">
            <Link
              to="/auth/login"
              className="btn rounded-full border-gray-300 btn-xs sm:btn-sm bg-linear-to-br from-[#0F83B2] to-[#36b6e9] text-white"
            >
              <IoLogIn /> Login
            </Link>
            <Link
              to="/auth/register"
              className="btn rounded-full border-gray-300 btn-xs sm:btn-sm bg-linear-to-br from-[#0F83B2] to-[#36b6e9] text-white"
            >
              Register
            </Link>
          </div> */}
          {/* // )} */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
