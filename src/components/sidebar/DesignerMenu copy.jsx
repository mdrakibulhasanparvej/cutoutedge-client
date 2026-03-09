import React from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineDesignServices } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";
import MenuItem from "../shared/menu-item/MenuItem";
import useUser from "../../hooks/useUser";

const DesignerMenu = () => {
  const { status } = useUser();

  return (
    <div>
      {status !== "blocked" && (
        <MenuItem
          icon={MdOutlineDesignServices}
          label={"Designs-online"}
          address='design-online'
        />
      )}
      <MenuItem icon={CgProfile} label={"My Profile"} address='profile' />
    </div>
  );
};

export default DesignerMenu;
