import React, { useContext, useEffect, useState } from "react";
import { FaUserCircle, FaEnvelope, FaEdit, FaLock } from "react-icons/fa";
import { AuthContextProvider } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { UserContextProvider } from "../../context/UserContext";
import { getItem } from "../../utils/LocalStorageManger";

const Account = () => {
  const { setLogged, setUser, isLogged, user } =
    useContext(AuthContextProvider);
  let { setResult, setRecent, Recent } = useContext(UserContextProvider);

  return (
    <div className="w-[80vw] mx-auto justify-center items-center flex  h-[70vh]">
      {/* Profile Card */}
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6 mt-10 text-center space-y-6 ">
        {/* Avatar + Info */}
        <div className="flex  items-center">
          <img
            src={user?.avatarUrl}
            className="w-20 h-20 bg-gray-300  mb-4 object-cover object-top"
          />
          <div className="px-10 text-left flex flex-col ">
            <h2 className="font-semibold text-lg">{user?.fullname}</h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <button className="mt-3 px-4 py-2 text-sm bg-gray-900 text-white rounded hover:bg-gray-700 transition">
              Edit Profile
            </button>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Uploaded PDFs */}
        <div className="text-left space-y-1">
          <h3 className="font-medium text-sm text-gray-700">
            Uploaded PDFs & Searchs:
          </h3>
          <ul className="text-sm text-gray-600 list-disc flex  pl-5 flex-col">
            {user?.uploads?.map((list, idx) => {
              return (
                <li key={idx} className="grid grid-cols-2 gap-2 capitalize">
                  {idx + 1}. {list?.title}
                  <Link
                    onClick={() => {
                      setResult({
                        title: list?.title,
                        data: JSON.parse(list?.data),
                      });
                    }}
                    to={"/dashboard/result"}
                    className="text-blue-600 hover:underline"
                  >
                    [View]
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Account;
