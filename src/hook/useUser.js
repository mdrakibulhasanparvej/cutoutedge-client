import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email, // Only fetch if logged in
    queryFn: async () => {
      if (!user?.email) throw new Error("User not logged in");
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  return { userData: data, isLoading, error, refetch };
};

export default useUser;
