import axios from "axios";
import React from "react";

const axiosSecure = axios.create({
  baseURL: "http://localhost:8080/api",

});

const useAxios = () => {
  return axiosSecure;
};

export default useAxios;
