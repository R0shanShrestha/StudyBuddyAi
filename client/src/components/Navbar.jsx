import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";

const Navbar = () => {
  const { isLogged, user, setUser } = useContext(AuthContextProvider);
  const [check, setCheck] = useState();

  return (
    <>
      {isLogged ? (
        <div className="flex flex-col sm:flex-row justify-between items-center w-[70vw] mx-auto mb-12 gap-4 ">
          <h1 className="text-xl sm:text-2xl font-bold">
            <Link to={"/dashboard"}>StudyBuddy Ai</Link>
          </h1>
          {isLogged ? (
            <div className="text-sm flex items-center gap-3 ">
              <Link to={"/dashboard/user"}>Hello, {user.fullname}!</Link>
              <Link
                to={"/logout"}
                className="bg-gray-800 text-white text-xs px-4 py-2 rounded-md hover:bg-gray-700 transition"
              >
                Logout
              </Link>
            </div>
          ) : (
            <div className="text-sm space-x-4">
              <Link
                to="/signup"
                className="font-semibold hover:text-pink-500 transition duration-300"
              >
                SignUp
              </Link>
              <span>/</span>
              <Link
                to="/login"
                className="font-semibold hover:text-pink-500 transition duration-300"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row justify-between items-center w-[70vw] mx-auto mb-12 gap-4 ">
          <h1 className="text-xl sm:text-2xl font-bold">
            <Link to={"/"}>StudyBuddy</Link>
          </h1>

          <div className="text-sm space-x-4">
            <Link
              to="/signup"
              className="font-semibold hover:text-pink-500 transition duration-300"
            >
              SignUp
            </Link>
            <span>/</span>
            <Link
              to="/login"
              className="font-semibold hover:text-pink-500 transition duration-300"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
