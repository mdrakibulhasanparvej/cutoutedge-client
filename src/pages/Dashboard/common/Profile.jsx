import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

import useUser from "../../../hooks/useUser";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import useBDLocation from "../../../hooks/useBDLocation";
import useTitle from "../../../hooks/useTitle";

import Button from "../../../components/ui/Button";
import ProfileSkeleton from "../../../components/ui/Loading/Profile/ProfileSkeleton";
import AddressSelect from "../Students/AddressSelect";

/* ================= INFO COMPONENT ================= */
const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    <p className="font-medium text-gray-900 dark:text-gray-100">
      {value || "—"}
    </p>
  </div>
);

const Profile = () => {
  useTitle("Profile");

  const { userData: dbUser, isLoading, refetch } = useUser();
  const { user: firebaseUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxios();

  const [isEditing, setIsEditing] = useState(false);
  const [preview, setPreview] = useState("");

  const { register, handleSubmit, reset, watch } = useForm();

  /* ================= BD LOCATION ================= */
  const {
    divisions,

    // Present
    presentDivision,
    presentDistrict,
    presentUpazila,
    presentUnion,
    filteredPresentDistricts,
    filteredPresentUpazilas,
    filteredPresentUnions,
    setPresentDivision,
    setPresentDistrict,
    setPresentUpazila,
    setPresentUnion,

    // Permanent
    permanentDivision,
    permanentDistrict,
    permanentUpazila,
    permanentUnion,
    filteredPermanentDistricts,
    filteredPermanentUpazilas,
    filteredPermanentUnions,
    setPermanentDivision,
    setPermanentDistrict,
    setPermanentUpazila,
    setPermanentUnion,
  } = useBDLocation();

  /* ================= INIT FORM ================= */
  useEffect(() => {
    if (dbUser && isEditing) {
      reset({
        name: dbUser.name,
        bloodGroup: dbUser.bloodGroup,
        presentAddressLine: dbUser.presentAddress?.address,
        permanentAddressLine: dbUser.permanentAddress?.address,
      });

      setPreview(dbUser.avatar);

      setPresentDivision(
        divisions.find((d) => d.name === dbUser.presentAddress?.division)
      );
      setPermanentDivision(
        divisions.find((d) => d.name === dbUser.permanentAddress?.division)
      );
    }
  }, [dbUser, isEditing, reset, divisions]);

  /* ================= IMAGE PREVIEW ================= */
  const avatarFile = watch("avatar");
  useEffect(() => {
    if (avatarFile?.[0]) {
      setPreview(URL.createObjectURL(avatarFile[0]));
    }
  }, [avatarFile]);

  /* ================= UPDATE PROFILE ================= */
  const updateMutation = useMutation({
    mutationFn: async (data) => {
      let photoURL = dbUser.avatar;

      if (data.avatar?.[0]) {
        const formData = new FormData();
        formData.append("image", data.avatar[0]);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgBB_host}`,
          formData
        );

        photoURL = res.data.data.url;
      }

      const payload = {
        name: data.name,
        avatar: photoURL,
        bloodGroup: data.bloodGroup,

        presentAddress: {
          address: data.presentAddressLine,
          division: presentDivision?.name,
          district: presentDistrict?.name,
          upazila: presentUpazila?.name,
          union: presentUnion?.name,
        },

        permanentAddress: {
          address: data.permanentAddressLine,
          division: permanentDivision?.name,
          district: permanentDistrict?.name,
          upazila: permanentUpazila?.name,
          union: permanentUnion?.name,
        },
      };

      await axiosSecure.patch(`/user-profile/${firebaseUser.email}`, payload);

      await updateUserProfile({
        displayName: data.name,
        photoURL,
      });
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      setIsEditing(false);
      refetch();
    },
    onError: () => toast.error("Profile update failed"),
  });

  if (isLoading) return <ProfileSkeleton />;

  return (
    <div className="py-6 max-w-5xl mx-auto">
      <motion.div
        className="p-6 rounded-2xl border shadow-sm bg-white dark:bg-gray-900 dark:border-gray-700"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border rounded-xl p-5 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-center gap-5">
            <img
              src={preview || dbUser.avatar}
              className="w-28 h-28 rounded-full object-cover border"
            />
            <div>
              <h2 className="md:text-2xl font-semibold text-gray-900 dark:text-white">
                {dbUser.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {dbUser.email}
              </p>
              <div className="flex gap-2 mt-2">
                <span className="px-3 py-1 text-xs rounded-full bg-blue-600 text-white">
                  {dbUser.role}
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-green-600 text-white">
                  {dbUser.status}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="btn btn-outline rounded-full"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* ================= PROFILE VIEW ================= */}
        {!isEditing && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6 border rounded-xl p-5 bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Info label="Name" value={dbUser.name} />
            <Info label="Email" value={dbUser.email} />
            <Info label="Blood Group" value={dbUser.bloodGroup} />

            <div className="md:col-span-2">
              <Info
                label="Present Address"
                value={`${dbUser.presentAddress?.address}, ${dbUser.presentAddress?.union}, ${dbUser.presentAddress?.upazila}, ${dbUser.presentAddress?.district}, ${dbUser.presentAddress?.division}`}
              />
            </div>

            <div className="md:col-span-2">
              <Info
                label="Permanent Address"
                value={`${dbUser.permanentAddress?.address}, ${dbUser.permanentAddress?.union}, ${dbUser.permanentAddress?.upazila}, ${dbUser.permanentAddress?.district}, ${dbUser.permanentAddress?.division}`}
              />
            </div>
          </motion.div>
        )}

        {/* ================= EDIT FORM ================= */}
        {isEditing && (
          <motion.form
            onSubmit={handleSubmit((data) => updateMutation.mutate(data))}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6 dark:text-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 col-span-2 border p-4 rounded-xl dark:border-gray-700 dark:bg-gray-800">
              <input
                type="file"
                {...register("avatar")}
                className="col-span-full file-input"
              />

              <input
                {...register("name", { required: true })}
                placeholder="Name"
                className="input input-bordered"
              />

              <select
                {...register("bloodGroup", { required: true })}
                className="select select-bordered"
              >
                <option value="">Blood Group</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (bg) => (
                    <option key={bg}>{bg}</option>
                  )
                )}
              </select>
            </div>

            {/* ================= Address Section ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 col-span-2 border p-4 rounded-xl dark:border-gray-700 dark:bg-gray-800">
              {/* Present Address */}
              <h3 className="col-span-full font-semibold text-lg">
                Present Address
              </h3>
              <div className="form-control">
                <legend className="w-full">village</legend>
                <input
                  {...register("presentAddressLine", { required: true })}
                  placeholder="Present Address"
                  className="input input-bordered"
                />
              </div>
              <AddressSelect
                label="Division"
                value={presentDivision}
                options={divisions}
                onChange={setPresentDivision}
              />
              <AddressSelect
                label="District"
                value={presentDistrict}
                options={filteredPresentDistricts}
                onChange={setPresentDistrict}
                disabled={!presentDivision}
              />
              <AddressSelect
                label="Upazila"
                value={presentUpazila}
                options={filteredPresentUpazilas}
                onChange={setPresentUpazila}
                disabled={!presentDistrict}
              />
              <AddressSelect
                label="Union"
                value={presentUnion}
                options={filteredPresentUnions}
                onChange={setPresentUnion}
                disabled={!presentUpazila}
              />

              {/* Permanent Address */}
              <h3 className="col-span-full font-semibold text-lg mt-4">
                Permanent Address
              </h3>
              <div className="form-control">
                <legend className="w-full">Village</legend>
                <input
                  {...register("permanentAddressLine", { required: true })}
                  placeholder="Permanent Address"
                  className="input input-bordered"
                />
              </div>
              <AddressSelect
                label="Division"
                value={permanentDivision}
                options={divisions}
                onChange={setPermanentDivision}
              />
              <AddressSelect
                label="District"
                value={permanentDistrict}
                options={filteredPermanentDistricts}
                onChange={setPermanentDistrict}
                disabled={!permanentDivision}
              />
              <AddressSelect
                label="Upazila"
                value={permanentUpazila}
                options={filteredPermanentUpazilas}
                onChange={setPermanentUpazila}
                disabled={!permanentDistrict}
              />
              <AddressSelect
                label="Union"
                value={permanentUnion}
                options={filteredPermanentUnions}
                onChange={setPermanentUnion}
                disabled={!permanentUpazila}
              />
            </div>

            <div className="col-span-full text-right">
              <Button label="Save" loading={updateMutation.isLoading} />
            </div>
          </motion.form>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;
