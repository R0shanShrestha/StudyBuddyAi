import React, { useContext, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { UserContextProvider } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Loading = () => {
  const { isloading } = useContext(UserContextProvider);
  const navto = useNavigate();
  useEffect(() => {
    isloading ? "" : navto("/dashboard/result");
  }, []);

  return (
    <div className="flex  items-center justify-center min-w-[300px]  max-w-[400px]  mx-auto min-h-[80vh]">
      {" "}
      {/* Loader Card */}
      <div className="bg-white  rounded-xl p-6 w-full max-w-md text-center shadow-md animate-fade-in-up">
        <h2 className="text-lg font-semibold italic mb-4">
          Processing Your Data...
        </h2>

        <div className="flex justify-center mb-4">
          <FaSpinner className="animate-spin text-gray-600 text-3xl" />
        </div>

        <p className="text-sm text-gray-600 mb-1">
          Hang tight! We're creating your study materials.
        </p>
        <p className="text-xs text-gray-500">(Estimated time: ~10 seconds)</p>
      </div>
    </div>
  );
};

export default Loading;
