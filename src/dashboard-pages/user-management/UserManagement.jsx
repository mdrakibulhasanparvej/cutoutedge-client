import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useTitle from "../../hooks/useTitle";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";

const UserManagement = () => {
  useTitle("User Management");
  const axiosSecure = useAxiosSecure();

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      // res.data has data inside it, see backend
      return res.data.data;
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: async ({ id, newStatus }) => {
      const res = await axiosSecure.patch(`/users/${id}/status`, { status: newStatus });
      return res.data;
    },
    onSuccess: () => {
      toast.success("User status updated successfully");
      refetch();
    },
    onError: () => {
      toast.error("Failed to update user status");
    },
  });

  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";
    toggleStatusMutation.mutate({ id, newStatus });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 h-full w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">User Management</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow dark:bg-gray-800">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b dark:border-gray-600">
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={u.profileURL} alt={u.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{u.name}</div>
                    </div>
                  </div>
                </td>
                <td>{u.email}</td>
                <td>
                  <span className="badge badge-info">{u.role}</span>
                </td>
                <td>
                  <span
                    className={`badge ${
                      u.status === "active" ? "badge-success" : "badge-error"
                    }`}
                  >
                    {u.status || "active"}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleToggleStatus(u._id, u.status || "active")}
                    className={`btn btn-sm ${
                      u.status === "active" ? "btn-error" : "btn-success"
                    } text-white`}
                    disabled={toggleStatusMutation.isPending}
                  >
                    {u.status === "active" ? "Block" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
