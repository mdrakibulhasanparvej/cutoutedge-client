import React from "react";
import { Link } from "react-router";
import Navbar from "../../component/shared/Navbar/Navbar";
import Login from "./Login/Login";
import Register from "./Register/Register";

const Home = () => {
  return (
    <>
      <Navbar />
      <Login />
      <Register />
    </>
  );
};

export default Home;
