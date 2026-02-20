import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthContext";


const useAuth = () => {
  const authinfo = useContext(AuthContext);

  return authinfo;
};

export default useAuth;
