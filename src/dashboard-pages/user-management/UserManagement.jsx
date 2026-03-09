import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useTitle from "../../hooks/useTitle";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import { Ban, Check, Trash2 } from "lucide-react";
import MyConfirmAlert from "../../components/shared/alerts/MyConfirmAlert";

const UserManagement = () => {
  useTitle("User Management");
  const axiosSecure = useAxiosSecure();

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
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

  const deleteUserMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/users/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("User deleted successfully");
      refetch();
    },
    onError: () => {
      toast.error("Failed to delete user");
    },
  });

  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";
    toggleStatusMutation.mutate({ id, newStatus });
  };

  const handleDeleteUser = async (id, userName) => {
    const result = await MyConfirmAlert({
      title: "Delete User",
      text: `Are you sure you want to delete "${userName}"? This action cannot be undone.`,
      icon: "warning",
      confirmText: "Delete",
    });

    if (result.isConfirmed) {
      deleteUserMutation.mutate(id);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 h-full w-full bg-gray-50 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">User Management</h2>
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <th className="text-gray-800 dark:text-gray-100">Name</th>
              <th className="text-gray-800 dark:text-gray-100">Email</th>
              <th className="text-gray-800 dark:text-gray-100">Role</th>
              <th className="text-gray-800 dark:text-gray-100">Status</th>
              <th className="text-gray-800 dark:text-gray-100">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b border-gray-200 dark:border-gray-600">
                <td className="text-gray-800 dark:text-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={u.profileURL} alt={u.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-800 dark:text-gray-100">{u.name}</div>
                    </div>
                  </div>
                </td>
                <td className="text-gray-600 dark:text-gray-300">{u.email}</td>
                <td className="text-gray-600 dark:text-gray-300">
                  <span className="badge badge-info">{u.role}</span>
                </td>
                <td className="text-gray-600 dark:text-gray-300">
                  <span
                    className={`badge ${
                      u.status === "active" ? "badge-success" : "badge-error"
                    }`}
                  >
                    {u.status || "active"}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleStatus(u._id, u.status || "active")}
                      className={`btn btn-sm btn-circle ${
                        u.status === "active" 
                          ? "btn-error" : "btn-success"
                      } text-white`}
                      disabled={toggleStatusMutation.isPending}
                      title={u.status === "active" ? "Block" : "Activate"}
                    >
                      {u.status === "active" ? <Ban size={16} /> : <Check size={16} />}
                    </button>
                    <button
                      onClick={() => handleDeleteUser(u._id, u.name)}
                      className="btn btn-sm btn-circle btn-outline btn-error"
                      disabled={deleteUserMutation.isPending}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500 dark:text-gray-400">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
