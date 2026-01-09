import React from "react";
import AdminStatics from "../../../components/Dashboard/Statistics/AdminStatics";
import useUser from "../../../hooks/useUser";
import BlodDonnerStatics from "../../../components/Dashboard/Statistics/StudentStatistics";
import useTitle from "../../../hooks/useTitle";

const Statistics = () => {
  useTitle("Statistics");
  const { userData: dbUser, isLoading } = useUser();
  return (
    <div>
      <h2>text will go here</h2>
    </div>
    // <div>
    //   {dbUser?.role === "donor" && <BlodDonnerStatics dbUser={dbUser} />}
    //   {dbUser?.role === "admin" && <AdminStatics dbUser={dbUser} />}
    //   {dbUser?.role === "volunteer" && <AdminStatics dbUser={dbUser} />}
    // </div>
  );
};

export default Statistics;
