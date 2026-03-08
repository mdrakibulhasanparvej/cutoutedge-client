import { CgProfile } from "react-icons/cg";
import { MdOutlineDesignServices } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import MenuItem from "../shared/menu-item/MenuItem";

const AdminMenu = () => {
  return (
    <>
      <MenuItem
        icon={MdOutlineDesignServices}
        label={"Designs-online"}
        address='design-online'
      />
      <MenuItem
        icon={MdOutlineDesignServices}
        label={"Create a Project"}
        address='create-project'
      />
      <MenuItem icon={FaUsers} label={"User Management"} address='user-management' />
      <MenuItem icon={CgProfile} label={"My Profile"} address='profile' />
    </>
  );
};

export default AdminMenu;
