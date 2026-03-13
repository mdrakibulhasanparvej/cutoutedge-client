import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Briefcase, Network, Building2, MapPin, Mail, Plus, Trophy, ClipboardList, Users, PlayCircle, CheckCircle, XCircle, Phone, FileText, IdCard, Calendar, UserCheck } from "lucide-react";

import useUser from "../../hooks/useUser";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxiosSecure";
import useTitle from "../../hooks/useTitle";
import useBDLocation from "../../hooks/useBDLocation";

import AddressSelect from "./AddressSelect";
import StatsCard from "../../components/shared/Cards/StatsCard";
import Pending from "../../components/design-tabs/pending/Pending";
import InProgress from "../../components/design-tabs/in-progress/InProgress";

const InfoForm = ({ label, value }) => (
  <div className='bg-white p-3 rounded-xl border-gray-500 shadow-sm'>
    <p className='text-sm text-gray-500 dark:text-gray-400'>{label}</p>
    <p className='font-medium text-gray-900 dark:text-gray-100'>
      {value || "—"}
    </p>
  </div>
);

const Profile = () => {
  useTitle("Profile");

  const {
    userData,
    name: bdName,
    avatar: bdAvatar,
    employeeInfo,
    presentAddress: dbPresent,
    permanentAddress: dbPermanent,
    role,
    email: dbEmail,
    phone: dbPhone,
    isLoading,
    refetch,
    status: userDBStatus,
  } = useUser();

  const userInfo = {
    name: bdName,
    email: dbEmail || userData?.email,
    phone: dbPhone || userData?.phone,
    avatar: bdAvatar,
    bloodGroup: userData?.bloodGroup,
  };
  const userStatus = { status: userDBStatus || userData?.status };

  const { user: firebaseUser, updateUserProfile } = useAuth();
  const axiosUsers = useAxios();

  const [isEditing, setIsEditing] = useState(false);
  const [editingSection, setEditingSection] = useState("basic");
  const [preview, setPreview] = useState("");
  const isInitialResetDone = useRef(false);

  const { register, handleSubmit, reset, watch, setValue } = useForm();

  const departments = [
    "Designer",
    "Quality Control 1",
    "Quality Control 2",
    "Incharge",
    "Manager",
    "Accountant",
    "Marketing",
    "Production",
    "Sales",
    "HR",
    "Admin",
  ];

  const {
    divisions,
    districts,
    upazilas,
    presentDivision,
    setPresentDivision,
    presentDistrict,
    setPresentDistrict,
    presentUpazila,
    setPresentUpazila,
    filteredPresentDistricts,
    filteredPresentUpazilas,
    permanentDivision,
    setPermanentDivision,
    permanentDistrict,
    setPermanentDistrict,
    permanentUpazila,
    setPermanentUpazila,
    filteredPermanentDistricts,
    filteredPermanentUpazilas,
  } = useBDLocation();

  useEffect(() => {
    if (userData && !isInitialResetDone.current && divisions.length > 0) {
      reset({
        name: userInfo?.name || "",
        phone: userInfo?.phone || "",
        bloodGroup: userInfo?.bloodGroup || "",
        identityCardNo: employeeInfo?.identityCardNo || "",
        designation: employeeInfo?.designation || "",
        department: employeeInfo?.department || "",
        joiningDate: employeeInfo?.joiningDate || "",
        dateOfissue: employeeInfo?.dateOfissue || "",
        presentAddressLine: dbPresent?.address || "",
        permanentAddressLine: dbPermanent?.address || "",
      });

      if (dbPresent) {
        const div = divisions.find((d) => d.name === dbPresent.division);
        if (div) setPresentDivision(div);
      }
      if (dbPermanent) {
        const div = divisions.find((d) => d.name === dbPermanent.division);
        if (div) setPermanentDivision(div);
      }

      setPreview(userInfo?.avatar || "");
      isInitialResetDone.current = true;
    }
  }, [
    userData,
    reset,
    userInfo,
    employeeInfo,
    dbPresent,
    dbPermanent,
    divisions,
  ]);

  useEffect(() => {
    if (
      dbPresent &&
      districts.length > 0 &&
      presentDivision &&
      !presentDistrict
    ) {
      const dist = districts.find(
        (d) =>
          d.name === dbPresent.district &&
          String(d.division_id) === String(presentDivision.id),
      );
      if (dist) setPresentDistrict(dist);
    }
    if (
      dbPermanent &&
      districts.length > 0 &&
      permanentDivision &&
      !permanentDistrict
    ) {
      const dist = districts.find(
        (d) =>
          d.name === dbPermanent.district &&
          String(d.division_id) === String(permanentDivision.id),
      );
      if (dist) setPermanentDistrict(dist);
    }
  }, [districts, dbPresent, dbPermanent, presentDivision, permanentDivision]);

  useEffect(() => {
    if (
      dbPresent &&
      upazilas.length > 0 &&
      presentDistrict &&
      !presentUpazila
    ) {
      const upz = upazilas
        .filter((u) => String(u.district_id) === String(presentDistrict.id))
        .find((u) => u.name === dbPresent.upazila);
      if (upz) setPresentUpazila(upz);
    }
    if (
      dbPermanent &&
      upazilas.length > 0 &&
      permanentDistrict &&
      !permanentUpazila
    ) {
      const upz = upazilas
        .filter((u) => String(u.district_id) === String(permanentDistrict.id))
        .find((u) => u.name === dbPermanent.upazila);
      if (upz) setPermanentUpazila(upz);
    }
  }, [upazilas, dbPresent, dbPermanent, presentDistrict, permanentDistrict]);

  const handleSameAsPresent = (e) => {
    if (e.target.checked) {
      setPermanentDivision(presentDivision);
      setPermanentDistrict(presentDistrict);
      setPermanentUpazila(presentUpazila);
      setValue("permanentAddressLine", watch("presentAddressLine"));
    }
  };

  const avatarFile = watch("avatar");
  useEffect(() => {
    if (avatarFile?.[0]) {
      const url = URL.createObjectURL(avatarFile[0]);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [avatarFile]);

  const updateMutation = useMutation({
    mutationFn: async (data) => {
      let photoURL = userInfo?.avatar;

      if (data.avatar?.[0]) {
        const formData = new FormData();
        formData.append("image", data.avatar[0]);
        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgBB_host}`,
          formData,
        );
        photoURL = res.data.data.url;
      }

      const payload = {
        userinfo: {
          email: userInfo?.email || firebaseUser?.email,
          name: data.name || userInfo?.name,
          phone: data.phone || userInfo?.phone,
          avatar: photoURL,
          bloodGroup: data.bloodGroup || userInfo?.bloodGroup,
        },
        employeeInfo: {
          identityCardNo:
            data.identityCardNo || employeeInfo?.identityCardNo || "",
          designation: data.designation || employeeInfo?.designation || "",
          department: data.department || employeeInfo?.department || "",
          joiningDate: data.joiningDate || employeeInfo?.joiningDate || "",
          dateOfissue: data.dateOfissue || employeeInfo?.dateOfissue || "",
        },
        presentAddress: {
          address: data.presentAddressLine || dbPresent?.address,
          division: presentDivision?.name || dbPresent?.division,
          district: presentDistrict?.name || dbPresent?.district,
          upazila: presentUpazila?.name || dbPresent?.upazila,
        },
        permanentAddress: {
          address: data.permanentAddressLine || dbPermanent?.address,
          division: permanentDivision?.name || dbPermanent?.division,
          district: permanentDistrict?.name || dbPermanent?.district,
          upazila: permanentUpazila?.name || dbPermanent?.upazila,
        },
      };

      await axiosUsers.patch(
        `/users/profile/${userInfo?.email || firebaseUser.email}`,
        payload,
      );

      if (data.name || data.avatar?.[0]) {
        await updateUserProfile({
          displayName: data.name || userInfo?.name,
          photoURL,
        });
      }
    },
    onSuccess: () => {
      toast.success("Updated successfully! 🎉");
      setIsEditing(false);
      isInitialResetDone.current = false;
      refetch();
    },
    onError: () => toast.error("Update failed ❌"),
  });

  if (isLoading) {
    return (
      <div className='min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900'>
        <p className='animate-pulse font-medium text-gray-600 dark:text-gray-300 text-lg'>
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className='bg-gray-50 dark:bg-gray-900 min-h-screen font-sans text-gray-800 dark:text-gray-200 pb-10'>
      {/* --- Top Banner Section --- */}
      <div className='bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700'>
        <div className='relative h-48 bg-[#091e42] overflow-hidden'>
          <div className='absolute inset-0 opacity-40 bg-linear-to-r from-[#0065b2] to-[#00a8e1]'></div>
          <div className='absolute right-10 top-10 text-white text-right'>
            <h1 className='text-3xl dark:text-gray-300 font-bold tracking-widest uppercase'>
              {userInfo?.name || "User Name"}
            </h1>
            <p className='text-sm opacity-80 font-medium uppercase mt-1'>
              {role || "Member"}
            </p>
          </div>
        </div>

        <div className='max-w-7xl mx-auto px-8 relative pb-6'>
          <div className='absolute -top-16 left-8'>
            <div className='w-32 h-32 rounded-full border-4 border-white dark:border-gray-700 overflow-hidden bg-gray-100 dark:bg-gray-700 shadow-md'>
              <img
                src={preview || userInfo?.avatar}
                alt='Profile'
                className='w-full h-full object-cover'
              />
            </div>
          </div>

          <div className='pt-20 flex justify-between items-end'>
            <div>
              <h2 className='text-2xl text-gray-800 dark:text-gray-100 font-semibold'>
                {userInfo?.name}
              </h2>
              <div className='flex gap-2 mt-1'>
                <span className='px-2 py-0.5 text-xs rounded-md bg-blue-50 text-blue-700 font-bold border border-blue-100 uppercase'>
                  {role}
                </span>
                <span
                  className={`px-2 py-0.5 text-xs rounded-md font-bold border uppercase ${userStatus?.status === "blocked" ? "bg-red-50 text-red-700 border-red-100" : "bg-green-50 text-green-700 border-green-100"}`}>
                  {userStatus?.status || "active"}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className='px-6 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 rounded-md font-semibold text-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition-all shadow-sm active:scale-95'>
              {isEditing ? "View Profile" : "Edit Profile"}
            </button>
          </div>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className='max-w-7xl mx-auto px-8 py-8'>
        {isEditing ? (
          /* === EDIT MODE === */
          <div className='grid grid-cols-12 gap-8'>
            <div className='col-span-12 lg:col-span-3 space-y-4'>
              <div className='bg-white dark:bg-gray-800 p-2 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col'>
                <button
                  onClick={() => setEditingSection("basic")}
                  className={`text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all ${editingSection === "basic" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"}`}>
                  Basic Info
                </button>
                <button
                  onClick={() => setEditingSection("employee")}
                  className={`text-left px-4 py-3 rounded-lg text-sm font-semibold mt-1 transition-all ${editingSection === "employee" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"}`}>
                  Employee Details
                </button>
                <button
                  onClick={() => setEditingSection("address")}
                  className={`text-left px-4 py-3 rounded-lg text-sm font-semibold mt-1 transition-all ${editingSection === "address" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"}`}>
                  Address Information
                </button>
              </div>
            </div>

            <div className='col-span-12 lg:col-span-9 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-8'>
              <form
                onSubmit={handleSubmit((data) => updateMutation.mutate(data))}
                className='space-y-6'>
                {editingSection === "basic" && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className='space-y-6'>
                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-4'>
                      Basic Information
                    </h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div className='md:col-span-2'>
                        <label className='text-sm font-bold text-gray-600 dark:text-gray-400 mb-2 block uppercase tracking-wider'>
                          Profile Picture
                        </label>
                        <input
                          type='file'
                          {...register("avatar")}
                          className='file-input file-input-bordered w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-200 dark:border-gray-600'
                        />
                      </div>
                      <div>
                        <label className='text-sm font-bold text-gray-600 dark:text-gray-400 mb-2 block uppercase tracking-wider'>
                          Full Name
                        </label>
                        <input
                          {...register("name")}
                          className='input input-bordered w-full bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500'
                          placeholder='Your Name'
                        />
                      </div>
                      <div>
                        <label className='text-sm font-bold text-gray-600 dark:text-gray-400 mb-2 block uppercase tracking-wider'>
                          Phone Number
                        </label>
                        <input
                          {...register("phone")}
                          className='input input-bordered w-full bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500'
                          placeholder='e.g. +8801...'
                        />
                      </div>
                      <div>
                        <label className='text-sm font-bold text-gray-600 dark:text-gray-400 mb-2 block uppercase tracking-wider'>
                          Blood Group
                        </label>
                        <select
                          {...register("bloodGroup")}
                          className='select select-bordered w-full bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100'>
                          <option
                            value=''
                            className='bg-white dark:bg-gray-700'>
                            Select Blood Group
                          </option>
                          {[
                            "A+",
                            "A-",
                            "B+",
                            "B-",
                            "AB+",
                            "AB-",
                            "O+",
                            "O-",
                          ].map((bg) => (
                            <option key={bg} value={bg}>
                              {bg}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {editingSection === "employee" && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className='space-y-6'>
                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-4'>
                      Employee Details
                    </h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div>
                        <label className='text-sm font-bold text-gray-600 dark:text-gray-400 mb-2 block uppercase tracking-wider'>
                          Designation
                        </label>
                        <input
                          {...register("designation")}
                          className='input input-bordered w-full bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500'
                          placeholder='e.g. Senior Designer'
                        />
                      </div>
                      <div>
                        <label className='text-sm font-bold text-gray-600 dark:text-gray-400 mb-2 block uppercase tracking-wider'>
                          Department
                        </label>
                        <select
                          {...register("department")}
                          className='select select-bordered w-full bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100'>
                          <option
                            value=''
                            className='bg-white dark:bg-gray-700'>
                            Select Department
                          </option>
                          {departments.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className='text-sm font-bold text-gray-600 dark:text-gray-400 mb-2 block uppercase tracking-wider'>
                          ID Card Number
                        </label>
                        <input
                          {...register("identityCardNo")}
                          className='input input-bordered w-full bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500'
                          placeholder='ID Number'
                        />
                      </div>
                      <div>
                        <label className='text-sm font-bold text-gray-600 dark:text-gray-400 mb-2 block uppercase tracking-wider'>
                          Joining Date
                        </label>
                        <input
                          type='date'
                          {...register("joiningDate")}
                          className='input input-bordered w-full bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100'
                        />
                      </div>
                      <div>
                        <label className='text-sm font-bold text-gray-600 dark:text-gray-400 mb-2 block uppercase tracking-wider'>
                          ID Issue Date
                        </label>
                        <input
                          type='date'
                          {...register("dateOfissue")}
                          className='input input-bordered w-full bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100'
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {editingSection === "address" && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className='space-y-8'>
                    <div className='flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4'>
                      <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100'>
                        Address Information
                      </h3>
                      <div className='flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100'>
                        <input
                          type='checkbox'
                          id='sameAsPresent'
                          onChange={handleSameAsPresent}
                          className='checkbox checkbox-primary checkbox-sm'
                        />
                        <label
                          htmlFor='sameAsPresent'
                          className='text-xs font-bold text-blue-700 cursor-pointer uppercase'>
                          Permanent = Present
                        </label>
                      </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                      <div className='space-y-4'>
                        <h4 className='font-bold text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest border-l-4 border-blue-500 pl-3'>
                          Present Address
                        </h4>
                        <input
                          {...register("presentAddressLine")}
                          placeholder='Village/Area/Street'
                          className='input input-bordered w-full bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500'
                        />
                        <AddressSelect
                          label='Division'
                          value={presentDivision}
                          options={divisions}
                          onChange={setPresentDivision}
                        />
                        <AddressSelect
                          label='District'
                          value={presentDistrict}
                          options={filteredPresentDistricts}
                          onChange={setPresentDistrict}
                          disabled={!presentDivision}
                        />
                        <AddressSelect
                          label='Upazila'
                          value={presentUpazila}
                          options={filteredPresentUpazilas}
                          onChange={setPresentUpazila}
                          disabled={!presentDistrict}
                        />
                      </div>
                      <div className='space-y-4'>
                        <h4 className='font-bold text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest border-l-4 border-purple-500 pl-3'>
                          Permanent Address
                        </h4>
                        <input
                          {...register("permanentAddressLine")}
                          placeholder='Village/Area/Street'
                          className='input input-bordered w-full bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500'
                        />
                        <AddressSelect
                          label='Division'
                          value={permanentDivision}
                          options={divisions}
                          onChange={setPermanentDivision}
                        />
                        <AddressSelect
                          label='District'
                          value={permanentDistrict}
                          options={filteredPermanentDistricts}
                          onChange={setPermanentDistrict}
                          disabled={!permanentDivision}
                        />
                        <AddressSelect
                          label='Upazila'
                          value={permanentUpazila}
                          options={filteredPermanentUpazilas}
                          onChange={setPermanentUpazila}
                          disabled={!permanentDistrict}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className='pt-8 flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700'>
                  <button
                    type='button'
                    onClick={() => setIsEditing(false)}
                    className='btn btn-ghost font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'>
                    Cancel
                  </button>
                  <button
                    disabled={updateMutation.isPending}
                    className='btn bg-[#091e42] hover:bg-[#091e42]/90 text-white px-10 border-none'>
                    {updateMutation.isPending ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* === VIEW MODE === */
          <div className='grid grid-cols-12 gap-8'>
            {/* Left Sidebar */}
            <div className='col-span-12 lg:col-span-3 space-y-6'>
              {/* Professional Segment */}
              <section className='bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm'>
                <h3 className='font-bold mb-4 border-gray-200 dark:border-gray-700 pb-2 text-gray-700 dark:text-gray-300 uppercase tracking-wider text-[10px]'>
                  Professional Info
                </h3>
                <div className='space-y-4 text-xs text-gray-600 dark:text-gray-400 font-bold'>
                  <div className='flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-700/40 rounded-lg'>
                    <Briefcase size={16} className='text-blue-500 shrink-0' />
                    <div>
                      <p className='text-[9px] text-gray-400 dark:text-gray-500 uppercase'>
                        Designation
                      </p>
                      <p className='text-gray-800 dark:text-gray-200'>
                        {employeeInfo?.designation || "Not Set"}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-700/40 rounded-lg'>
                    <Building2 size={16} className='text-purple-500 shrink-0' />
                    <div>
                      <p className='text-[9px] text-gray-400 dark:text-gray-500 uppercase'>
                        Department
                      </p>
                      <p className='text-gray-800 dark:text-gray-200'>
                        {employeeInfo?.department || "Not Set"}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-700/40 rounded-lg'>
                    <IdCard size={16} className='text-indigo-500 shrink-0' />
                    <div>
                      <p className='text-[9px] text-gray-400 dark:text-gray-500 uppercase'>
                        ID Card No
                      </p>
                      <p className='text-gray-800 dark:text-gray-200'>
                        {employeeInfo?.identityCardNo || "Not Set"}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-700/40 rounded-lg'>
                    <Calendar size={16} className='text-teal-500 shrink-0' />
                    <div>
                      <p className='text-[9px] text-gray-400 dark:text-gray-500 uppercase'>
                        Joining Date
                      </p>
                      <p className='text-gray-800 dark:text-gray-200'>
                        {employeeInfo?.joiningDate || "Not Set"}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-700/40 rounded-lg'>
                    <UserCheck size={16} className='text-orange-500 shrink-0' />
                    <div>
                      <p className='text-[9px] text-gray-400 dark:text-gray-500 uppercase'>
                        ID Issue Date
                      </p>
                      <p className='text-gray-800 dark:text-gray-200'>
                        {employeeInfo?.dateOfissue || "Not Set"}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Personal & Social */}
              <section className='bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm'>
                <h3 className='font-bold mb-4 border-gray-200 dark:border-gray-700 pb-2 text-gray-700 dark:text-gray-300 uppercase tracking-wider text-[10px]'>
                  Personal Details
                </h3>
                <div className='space-y-4 text-xs font-bold'>
                  <div className='flex items-center gap-3 p-2 bg-red-50 text-red-700 rounded-lg border border-red-100'>
                    <Network size={16} className='text-red-400 shrink-0' />
                    <span>
                      {userInfo?.bloodGroup
                        ? `${userInfo.bloodGroup} Blood`
                        : "Blood Not Set"}
                    </span>
                  </div>
                  <div className='flex items-center gap-3 p-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-100'>
                    <Mail size={16} className='text-blue-400 shrink-0' />
                    <span className='truncate'>
                      {userInfo?.email || firebaseUser?.email}
                    </span>
                  </div>
                  {userInfo?.phone && (
                    <div className='flex items-center gap-3 p-2 bg-green-50 text-green-700 rounded-lg border border-green-100'>
                      <Phone size={16} className='text-green-400 shrink-0' />
                      <span>{userInfo.phone}</span>
                    </div>
                  )}
                </div>
              </section>

              {/* Geographical Segment */}
              <section className='bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm'>
                <h3 className='font-bold mb-4 border-gray-200 dark:border-gray-700 pb-2 text-gray-700 dark:text-gray-300 uppercase tracking-wider text-[10px]'>
                  Geographical Info
                </h3>
                <div className='space-y-4'>
                  <div className='bg-gray-50 dark:bg-gray-700/40 p-4 rounded-xl border border-gray-200 dark:border-gray-600'>
                    <div className='flex items-center gap-2 mb-2'>
                      <MapPin size={14} className='text-blue-500' />
                      <p className='text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest'>
                        Present Address
                      </p>
                    </div>
                    <p className='text-[11px] font-bold text-gray-600 dark:text-gray-300 leading-relaxed'>
                      {dbPresent?.address || "Street Not Set"}
                      <br />
                      {dbPresent?.upazila
                        ? `${dbPresent.upazila}, ${dbPresent.district}`
                        : "Area Not Set"}
                      <br />
                      {dbPresent?.division || "Division Not Set"}
                    </p>
                  </div>

                  <div className='bg-gray-50 dark:bg-gray-700/40 p-4 rounded-xl border border-gray-200 dark:border-gray-600'>
                    <div className='flex items-center gap-2 mb-2'>
                      <MapPin size={14} className='text-purple-500' />
                      <p className='text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest'>
                        Permanent Address
                      </p>
                    </div>
                    <p className='text-[11px] font-bold text-gray-600 dark:text-gray-300 leading-relaxed'>
                      {dbPermanent?.address || "Street Not Set"}
                      <br />
                      {dbPermanent?.upazila
                        ? `${dbPermanent.upazila}, ${dbPermanent.district}`
                        : "Area Not Set"}
                      <br />
                      {dbPermanent?.division || "Division Not Set"}
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Content */}
            <div className='col-span-12 lg:col-span-9 space-y-6'>
              {/* Stats Cards */}
              <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
                <StatsCard
                  title='Pending'
                  value='0'
                  icon={FileText}
                  color='bg-blue-600'
                />
                <StatsCard
                  title='In-Progress'
                  value='0'
                  icon={PlayCircle}
                  color='bg-yellow-600'
                />
                <StatsCard
                  title='Completed'
                  value='0'
                  icon={CheckCircle}
                  color='bg-green-600'
                />
                <StatsCard
                  title='Rejected'
                  value='0'
                  icon={XCircle}
                  color='bg-red-600'
                />
              </div>

              {/* Tabs Section */}
              <div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 shadow-sm'>
                <div className='flex justify-between items-center mb-10'>
                  <h3 className='font-bold text-xl text-gray-800 dark:text-gray-100'>
                    Project Workflows
                  </h3>
                  <span className='text-[10px] bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-gray-500 dark:text-gray-400 uppercase font-black tracking-widest'>
                    Real-time updates
                  </span>
                </div>

                <Tabs className='jira-tabs'>
                  <TabList className='flex gap-8 border-b border-gray-200 dark:border-gray-700 mb-8 overflow-x-auto no-scrollbar'>
                    {["Pending", "In-Progress", "QC Check", "History"].map(
                      (tab) => (
                        <Tab
                          key={tab}
                          className='pb-4 cursor-pointer text-sm font-bold text-gray-500 dark:text-gray-400 outline-none transition-all hover:text-blue-600 dark:hover:text-blue-400 border-b-2 border-transparent relative uppercase tracking-widest'
                          selectedClassName='!text-blue-600 dark:!text-blue-400 !border-blue-600'>
                          {tab}
                        </Tab>
                      ),
                    )}
                  </TabList>

                  <TabPanel>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}>
                      <Pending />
                    </motion.div>
                  </TabPanel>

                  <TabPanel>
                    <div className='space-y-3'>
                      <InProgress />
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className='py-20 text-center flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-700/30 border border-dashed border-gray-200 dark:border-gray-600 rounded-2xl'>
                      <ClipboardList
                        size={40}
                        className='text-gray-300 dark:text-gray-600 mb-3'
                      />
                      <p className='text-gray-500 dark:text-gray-400 font-bold text-xs uppercase tracking-widest'>
                        No active quality checks
                      </p>
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className='py-20 text-center flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-700/30 border border-dashed border-gray-200 dark:border-gray-600 rounded-2xl'>
                      <Trophy
                        size={40}
                        className='text-gray-300 dark:text-gray-600 mb-3'
                      />
                      <p className='text-gray-500 dark:text-gray-400 font-bold text-xs uppercase tracking-widest'>
                        Your project history is empty
                      </p>
                    </div>
                  </TabPanel>
                </Tabs>
              </div>

              {/* Reporting Line / Organization */}
              <div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 shadow-sm'>
                <h3 className='font-bold text-lg mb-8 text-gray-700 dark:text-gray-300 uppercase tracking-widest'>
                  Organization
                </h3>
                <div className='flex flex-col items-center py-10 bg-gray-50 dark:bg-gray-700/30 rounded-2xl border border-gray-200 dark:border-gray-600'>
                  <div className='w-16 h-16 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-sm mb-4'>
                    <Users
                      size={32}
                      className='text-gray-300 dark:text-gray-600'
                    />
                  </div>
                  <p className='text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest max-w-md text-center'>
                    Not currently assigned to an organization unit or team
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
