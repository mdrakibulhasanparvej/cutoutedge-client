import React from "react";
import MenuItem from "./MenuItem";
import { FaPaypal, FaUserCog } from "react-icons/fa";

const DesignerMenu = () => {
  return (
    <div>
      <MenuItem
        icon={FaUserCog}
        label="My Submition"
        address="admission-request"
      />
      <MenuItem
        icon={FaUserCog}
        label="Admision Form"
        address="create-admision-request"
      />
      <MenuItem icon={FaUserCog} label="Profile" address="profile" />
    </div>
  );
};

export default DesignerMenu;
