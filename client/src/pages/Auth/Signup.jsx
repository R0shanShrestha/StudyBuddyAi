import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { AuthContextProvider } from "../../context/AuthContext";
import { getItem } from "../../utils/LocalStorageManger";

const Signup = () => {
  const { Signup, isLogged } = useContext(AuthContextProvider);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const navto = useNavigate();

  useEffect(() => {
    const token = getItem("authtoken") || document.cookie.authtoken;
    if (token) {
      navto("/dashboard");
    }
  }, [isLogged]);
  // handling from
  const submitHandler = (e) => {
    e.preventDefault();
    if (email == "" || password == "" || fullname == "") {
      alert("All Field Required");
    } else {
      Signup({ email, password, fullname });
    }
  };
  return (
    <div className="w-[70vw] h-[70vh] flex items-center justify-center mx-auto">
      <div className="max-w-md w-full space-y-6 p-8 bg-white shadow-md rounded-xl border border-gray-100">
        <h2 className="text-2xl font-semibold mb-1  text-center">
          StudyBuddy <span className="text-pink-500">AI</span>
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Create your free AI-powered account
        </p>

        <form className="space-y-4">
          <input
            onChange={(e) => {
              setFullname(e.target.value);
            }}
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-4 rounded-md bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-4 rounded-md bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-4 rounded-md bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <button
            onClick={(e) => {
              submitHandler(e);
            }}
            type="submit"
            className="w-full py-3 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition-all duration-300"
          >
            Sign Up
          </button>
        </form>

        <div className="border-t pt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-pink-500 font-semibold hover:underline"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
