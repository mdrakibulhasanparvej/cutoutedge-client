import React from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineDesignServices } from "react-icons/md";
import MenuItem from "../shared/menu-item/MenuItem";
import useUser from "../../hooks/useUser";

const DesignerMenu = ({ sidebarOpen }) => {
  const { status } = useUser();

  return (
    <div>
      {status !== "blocked" && (
        <MenuItem
          icon={MdOutlineDesignServices}
          label={sidebarOpen ? "Designs-online" : ""}
          address='design-online'
        />
      )}
      <MenuItem
        icon={CgProfile}
        label={sidebarOpen ? "My Profile" : ""}
        address='profile'
      />
    </div>
  );
};

export default DesignerMenu;
