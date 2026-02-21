import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

// ১. এক্সিওস ইন্সট্যান্স তৈরি (Base URL কনফিগারেশন)
const axiosSecure = axios.create({
  baseURL: "http://localhost:8080/api",
});

const useAxios = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // ২. Request Interceptor: সার্ভারে রিকোয়েস্ট পাঠানোর আগে টোকেন গেঁথে দেওয়া
    const reqInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        // এখানে সরাসরি ইউজারের স্টেট থেকে টোকেন নেওয়া হচ্ছে (No LocalStorage)
        const token = await user?.getIdToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    // ৩. Response Interceptor: সার্ভার থেকে রিপ্লাই আসার পর চেক করা
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response; // রিকোয়েস্ট সফল হলে ডাটা পাস করে দাও
      },
      async (error) => {
        const status = error.response ? error.response.status : null;

        // ৪. অটোমেটিক লগআউট লজিক (401 বা 403 এরর আসলে)
        if (status === 401 || status === 403) {
          await logOut();
          navigate("/");
        }
        return Promise.reject(error);
      },
    );

    // ৫. Cleanup (বাঘ ফিক্সড): মেমোরি লিক এবং ডুপ্লিকেট ইন্টারসেপ্টর রোধ করা
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor); // এখানে আগে ভুল ছিল, এখন ঠিক করা হয়েছে
    };
  }, [user, logOut, navigate]); // ইউজার বা ফাংশন চেঞ্জ হলে ইন্টারসেপ্টর আপডেট হবে

  return axiosSecure;
};

export default useAxios;
