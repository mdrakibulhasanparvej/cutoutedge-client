import React from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineDesignServices } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";
import MenuItem from "../shared/menu-item/MenuItem";

const DesignerMenu = () => {
  return (
    <div>
      <MenuItem
        icon={MdOutlineDesignServices}
        label={"Designs-online"}
        address='design-online'
      />
      <MenuItem icon={CgProfile} label={"My Profile"} address='profile' />
    </div>
  );
};

export default DesignerMenu;
