import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import MyAlert from "../../components/shared/alerts/MyAlert";

const Login = () => {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await logIn(data.email, data.password);
      MyAlert({
        title: "Welcome",
        text: "You have successfully logged in",
      });
      navigate("/dashboard");
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      MyAlert({
        icon: "error",
        title: "Something went wrong",
        text: "please, try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // গুগল লগইন হ্যান্ডলার
  // const handleGoogleLogin = async () => {
  //   try {
  //     await signInWithGoogle();
  //     toast.success("Google Login successful! 🎉");
  //     navigate("/dashboard");
  //   } catch (error) {
  //     toast.error("Google sign-in failed ❌");
  //   }
  // };

  return (
    <div className='min-h-screen bg-[#F4F5F7] flex flex-col items-center justify-center p-4 font-sans text-[#172B4D]'>
      {/* --- Logo Area --- */}
      <div className='mb-10'>
        <img
          src='/Logo-01-1-2048x418.webp'
          alt='CUTOUT EDGE'
          className='w-64 h-auto object-contain transition-transform hover:scale-105 duration-300'
        />
      </div>

      {/* --- Login Card --- */}
      <div className='bg-white w-full max-w-100 p-10 rounded-md border border-gray-200 shadow-sm'>
        <h2 className='text-center text-lg font-semibold mb-6 text-[#42526E]'>
          Log in to continue
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              type='email'
              placeholder='Enter email'
              className={`w-full px-3 py-2 border-2 rounded-md outline-none transition-all text-sm ${
                errors.email
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-[#0F83B2]"
              }`}
            />
            {errors.email && (
              <p className='text-red-500 text-[11px] mt-1 font-medium'>
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              type='password'
              placeholder='Enter password'
              className={`w-full px-3 py-2 border-2 rounded-md outline-none transition-all text-sm ${
                errors.password
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-[#0F83B2]"
              }`}
            />
            {errors.password && (
              <p className='text-red-500 text-[11px] mt-1 font-medium'>
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type='submit'
            disabled={loading}
            className={`w-full cursor-pointer bg-[#0F83B2] hover:bg-[#03678e] text-white font-bold py-2 rounded-md transition-all active:scale-[0.98] shadow-sm ${loading ? "opacity-70 cursor-not-allowed" : ""}`}>
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <hr className='my-8 border-gray-100' />

        <div className='text-center text-sm flex flex-col items-center gap-2'>
          <div className='flex items-center gap-1'>
            <span className='text-gray-400'>Don't have an account?</span>
            <a
              onClick={() => navigate("/register")}
              className='text-[#0F83B2] font-bold hover:underline cursor-pointer'>
              Create an account
            </a>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className='mt-12 mb-4 flex flex-col items-center gap-2'>
        <div className='w-16 h-0.5 bg-gray-200 mb-2 rounded-full'></div>
        <p className='text-[10px] md:text-xs text-gray-400 uppercase tracking-[0.2em] font-medium text-center leading-relaxed'>
          © 2026 <span className='text-gray-600 font-bold'>CUTOUT EDGE</span> •
          All Rights Reserved.
        </p>
        <p className='text-[10px] text-gray-400 font-medium'>
          Design & Developed by
          <Link
            to='https://lazy-loader-five.vercel.app'
            target='blank'
            className='ml-1 text-[#0F83B2] hover:underline font-bold'>
            Lazy Loader
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
