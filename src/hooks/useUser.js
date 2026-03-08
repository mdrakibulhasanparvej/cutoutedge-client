import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxiosSecure";

const useUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`users/email/${user.email}`);
      return res.data.data;
    },
  });


  const { name, email, phone, role, photoURL, createdAt, updatedAt, _id, bloodGroup, employeeInfo, presentAddress, permanentAddress, status } = data || {}

  return {
    avatar: photoURL || user?.photoURL,
    userId: _id,
    name,
    email,
    phone,
    role,
    bloodGroup,
    employeeInfo,
    presentAddress,
    permanentAddress,
    status,
    userData: data,
    createdAt,
    updatedAt,
    isLoading,
    error,
    refetch,
  };
};

export default useUser;
