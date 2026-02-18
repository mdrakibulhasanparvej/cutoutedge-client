import { NavLink } from "react-router";
import { motion } from "framer-motion";

const MenuItem = ({ icon: Icon, label, address }) => {
  return (
    <NavLink to={address} end>
      {({ isActive }) => (
        <motion.div
          whileHover={{ scale: 1.01 }}
          className={`flex items-center gap-3 px-2 py-1 rounded-sm cursor-pointer
          transition relative
          ${
            isActive
              ? "bg-linear-to-br from-[#0F83B2] to-[#36b6e9] text-white p-4 rounded-sm text-[14px]"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 text-[14px]"
          }`}>
          {isActive && (
            <motion.span
              layoutId='activeGlow'
              className='absolute inset-0 rounded-lg bg-linear-to-br from-[#0F83B2] to-[#36b6e9]  -z-10'
            />
          )}

          <Icon className='text-lg' />
          <span className='font-medium'>{label}</span>
        </motion.div>
      )}
    </NavLink>
  );
};

export default MenuItem;
