import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../hook/useAuth";
import axios from "axios";
import useAxios from "../../../hook/useAxiosSecure";
import MyAlert from "../../Dashboard/common/MyAler";

const Register = () => {
  const navigate = useNavigate();
  const { createUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxios();
  const [isRegistering, setIsRegistering] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      age: "",
      role: "designer",
    },
  });

  const onSubmit = async (data) => {
    if (isRegistering) return;
    setIsRegistering(true);

    try {
      const formData = new FormData();
      formData.append("image", data.photo[0]);
      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgBB_host}`,
        formData
      );
      const photoURL = imgRes?.data.data.url || null;

      await createUser(data.email, data.password);

      const userInfo = {
        name: data.name,
        email: data.email,
        age: Number(data.age),
        role: data.role,
        profileURL: photoURL,
      };

      await axiosSecure.post("/users", userInfo);

      const updateProfile = {
        displayName: data.name,
        // photoURL
      }

      await updateUserProfile(updateProfile);

      MyAlert({
        title: "Congratulations",
        text: "You have been registered. please login to move forward"
      })

      navigate("/");
    } catch (error) {
      console.error(error);
      MyAlert({
        title: "Registration failed",
        text: "please, try again.",
        icon: "error"
      });
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className='min-h-screen bg-[#F4F5F7] flex flex-col items-center justify-center p-4 font-sans text-[#172B4D]'>
      <div className='mb-8'>
        <img
          src='/Logo-01-1-2048x418.webp'
          alt='CUTOUT EDGE'
          className='w-64 h-auto object-contain transition-transform hover:scale-105 duration-300'
        />
      </div>

      <div className='bg-white w-full max-w-112.5 p-10 rounded-md border border-gray-200 shadow-sm'>
        <h2 className='text-center text-lg font-semibold mb-2 text-[#42526E]'>
          Sign up for your account
        </h2>
        <p className='text-center text-sm text-gray-500 mb-8 font-medium'>
          Start your journey with Cutout Edge
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          {/* Full Name */}
          <div>
            <label className='text-[11px] font-bold text-gray-500 uppercase ml-1'>
              Full Name
            </label>
            <input
              {...register("name", { required: "Full name is required" })}
              type='text'
              placeholder='Enter your name'
              className={`w-full mt-1 px-3 py-2 border-2 rounded-md outline-none text-sm transition-all ${errors.name
                ? "border-red-500"
                : "border-gray-200 focus:border-[#0F83B2]"
                }`}
            />
            {errors.name && (
              <p className="text-red-500 text-[10px] mt-1 ml-1 font-medium">{errors.name.message}</p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label className='text-[11px] font-bold text-gray-500 uppercase ml-1'>
              Email Address
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              type='email'
              placeholder='Enter email'
              className={`w-full mt-1 px-3 py-2 border-2 rounded-md outline-none text-sm transition-all ${errors.email
                ? "border-red-500"
                : "border-gray-200 focus:border-[#0F83B2]"
                }`}
            />
            {errors.email && (
              <p className="text-red-500 text-[10px] mt-1 ml-1 font-medium">{errors.email.message}</p>
            )}
          </div>

          {/* Password  */}
          <div>
            <label className='text-[11px] font-bold text-gray-500 uppercase ml-1'>
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                },
              })}
              type='password'
              placeholder='Create password'
              className={`w-full mt-1 px-3 py-2 border-2 rounded-md outline-none text-sm transition-all ${errors.password
                ? "border-red-500"
                : "border-gray-200 focus:border-[#0F83B2]"
                }`}
            />
            {errors.password && (
              <p className="text-red-500 text-[10px] mt-1 ml-1 font-medium">{errors.password.message}</p>
            )}
          </div>

          <div className='grid grid-cols-2 gap-4'>
            {/* Age Field */}
            <div>
              <label className='text-[11px] font-bold text-gray-500 uppercase ml-1'>
                Age
              </label>
              <input
                {...register("age", { required: "Age is required" })}
                type='number'
                placeholder='Age'
                className={`w-full mt-1 px-3 py-2 border-2 rounded-md outline-none text-sm transition-all ${errors.age
                  ? "border-red-500"
                  : "border-gray-200 focus:border-[#0F83B2]"
                  }`}
              />
              {errors.age && (
                <p className="text-red-500 text-[10px] mt-1 ml-1 font-medium">{errors.age.message}</p>
              )}
            </div>

            {/* Role Field */}
            <div>
              <label className='text-[11px] font-bold text-gray-500 uppercase ml-1'>
                Role
              </label>
              <select
                {...register("role")}
                className='w-full mt-1 px-3 py-2 border-2 border-gray-200 rounded-md outline-none text-sm bg-white focus:border-[#0F83B2] cursor-pointer'>
                <option value='designer'>Designer</option>
                <option value='qc1'>QC-1</option>
                <option value='qc2'>QC-2</option>
                <option value='incharge'>Incharge</option>
              </select>
            </div>
          </div>

          {/* Profile Photo */}
          <div>
            <label className='text-[11px] font-bold text-gray-500 uppercase ml-1'>
              Profile Photo
            </label>
            <input
              {...register("photo")}
              type='file'
              className={`w-full mt-1 text-xs file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-[#0F83B2] hover:file:bg-gray-200 cursor-pointer ${errors.photo ? "border border-red-500 rounded-md" : ""
                }`}
            />
            {errors.photo && (
              <p className="text-red-500 text-[10px] mt-1 ml-1 font-medium">{errors.photo.message}</p>
            )}
          </div>

          <button
            disabled={isRegistering}
            type='submit'
            className={`w-full font-bold py-2.5 rounded-md transition-all active:scale-[0.98] shadow-sm text-white mt-2 ${isRegistering
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#0F83B2] hover:bg-[#03678e] cursor-pointer"
              }`}>
            {isRegistering ? "Registering..." : "Create Account"}
          </button>
        </form>

        <div className='mt-8 text-center text-sm'>
          <span className='text-gray-500'>Already have an account?</span>{" "}
          <a
            onClick={() => navigate("/")}
            className='text-[#0F83B2] font-bold hover:underline cursor-pointer'>
            Log in
          </a>
        </div>
      </div>

      {/* footer */}
      <div className='mt-12 mb-4 flex flex-col items-center gap-2'>
        <div className='w-16 h-0.5 bg-gray-200 mb-2 rounded-full'></div>
        <p className='text-[10px] md:text-xs text-gray-400 uppercase tracking-[0.2em] font-medium text-center'>
          © 2026 <span className='text-gray-600 font-bold'>CUTOUT EDGE</span> •
          All Rights Reserved.
        </p>
        <p className='text-[10px] text-gray-400 font-medium'>
          Design & Developed by{" "}
          <Link
            to='https://lazy-loader-five.vercel.app/about'
            target='blank'
            className='ml-1 text-[#0F83B2] hover:underline font-bold'>
            Lazy Loader
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;