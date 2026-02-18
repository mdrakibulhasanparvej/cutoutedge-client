import {
  FaUsers,
  FaUserCog,
  FaImages,
  FaImage,
  FaNewspaper,
  FaPlusSquare,
  FaClipboardList,
} from "react-icons/fa";
import { PiStudentBold, PiSlidersHorizontalDuotone } from "react-icons/pi";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { LuActivity } from "react-icons/lu";
import { SiActivitypub } from "react-icons/si";
import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUsers} label="All Users" address="all-users" />

      <MenuItem
        icon={PiStudentBold}
        label="All Students"
        address="all-student"
      />
      <MenuItem
        icon={FaClipboardList}
        label="Requested Admissions"
        address="admission-request"
      />

      <MenuItem
        icon={TfiLayoutSliderAlt}
        label="All Banner"
        address="all-banner"
      />

      <MenuItem
        icon={PiSlidersHorizontalDuotone}
        label="Add Banner Slider"
        address="add-banner-slider"
      />

      <MenuItem
        icon={LuActivity}
        label="All Activities"
        address="all-activites"
      />

      <MenuItem
        icon={SiActivitypub}
        label="Add Activities"
        address="add-activites"
      />

      <MenuItem
        icon={FaNewspaper}
        label="All News"
        address="all-news-gallery"
      />

      <MenuItem icon={FaPlusSquare} label="Add News" address="add-news" />

      <MenuItem
        icon={FaImages}
        label="All Images"
        address="all-Image-gallery"
      />

      <MenuItem icon={FaImage} label="Add Image" address="add-Image" />

      <MenuItem
        icon={FaClipboardList}
        label="Admission Request"
        address="admission-request"
      />

      <MenuItem icon={FaUserCog} label="Profile" address="profile" />
    </>
  );
};

export default AdminMenu;
