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
      return res.data.data ? res.data.data : res.data;
    },
  });

  // ডাটা না থাকলে বা লোডিং হলে একটি ডিফল্ট অবজেক্ট রিটার্ন করতে হবে
  // যাতে Destructuring করার সময় ক্র্যাশ না করে
  return {
    avatar: user?.photoURL || data?.photo,
    userName: data?.name || "",
    userEmail: data?.email || "",
    role: data?.role || "viewer",
    dbUser: data, // ডাটাবেসের পুরো অবজেক্ট এখানে থাকবে
    isLoading,
    error,
    refetch,
  };
};

export default useUser;
