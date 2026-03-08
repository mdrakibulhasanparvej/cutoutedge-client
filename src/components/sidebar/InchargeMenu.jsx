import React from "react";
import { FaUserCog, FaBriefcase } from "react-icons/fa";
import { BiDonateBlood } from "react-icons/bi";
import { SiWorkplace } from "react-icons/si";
import MenuItem from "./MenuItem";
import { PiStudentBold } from "react-icons/pi";

const InchargeMenu = () => {
  return (
    <>
      {/* Students */}
      <MenuItem
        icon={PiStudentBold}
        label="All Students"
        address="all-student"
      />

      {/* Admission */}
      <MenuItem
        icon={BiDonateBlood}
        label="Admission Request"
        address="admission-request"
      />

      {/* Job Holder */}
      <MenuItem
        icon={FaBriefcase}
        label="All Job Holder"
        address="all-job-holder"
      />
      <MenuItem
        icon={FaBriefcase}
        label="Add Job Holder"
        address="add-job-holder"
      />

      {/* Workplace */}
      <MenuItem
        icon={SiWorkplace}
        label="All Workplace"
        address="all-workplace"
      />
      <MenuItem
        icon={SiWorkplace}
        label="Add Workplace"
        address="add-workplace"
      />

      {/* Profile */}
      <MenuItem icon={FaUserCog} label="Profile" address="profile" />
    </>
  );
};

export default InchargeMenu;
