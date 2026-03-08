import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:8080/api",
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
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

    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const status = error.response ? error.response.status : null;

        if (status === 401 || status === 403) {
          await logOut();
          navigate("/");
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
