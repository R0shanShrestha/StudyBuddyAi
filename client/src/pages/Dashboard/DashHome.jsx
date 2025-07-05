import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContextProvider } from "../../context/UserContext";
import { FaSearch } from "react-icons/fa";

const DashHome = () => {
  const {
    isUploadMaterial,
    setUploadMaterial,
    generateData,
    Recent,
    setResult,
  } = useContext(UserContextProvider);

  const [prmt, setPrmt] = useState("");
  const subHandler = (e) => {
    e.preventDefault();

    if (prmt == "") {
      alert("Input is Empty !");
    } else {
      generateData({ prompt: prmt });
    }
  };
  return (
    <div className="  sm:max-w-[70vw] min-h-[80vh] mx-auto w-full p-2   flex items-center ">
      {/* Main Content */}
      <main className="text-center sm:max-w-3xl w-full  mx-auto shadow-xl p-10 rounded-2xl">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold  mb-2">
          Welcome back to StudyBuddy AI
        </h2>
        <p className="text-sm text-gray-600 mb-6">📚 Upload a PDF to Begin</p>
        <div className="flex flex-col w-fit mx-auto gap-2 mb-2">
          <button
            onClick={() => {
              setUploadMaterial((pre) => !pre);
            }}
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition mb-2 text-sm sm:text-base"
          >
            {isUploadMaterial ? "Close Uploader" : "Open Uploader"}
          </button>
          {/* SearchBox */}
          <p>You can also write directly and generate content instantly. </p>
          <form className="flex items-center bg-gray-50 border-slate-300 border rounded px-3 py-1">
            <input
              value={prmt}
              onChange={(e) => {
                setPrmt(e.target.value);
              }}
              type="text"
              placeholder="Enter your Chapter Name"
              className="bg-transparent p-2 w-full outline-none text-sm"
            />
            <button
              onClick={(e) => {
                subHandler(e);
              }}
            >
              <FaSearch />
            </button>
          </form>
        </div>
        <p className="text-xs text-gray-500 mb-3 italic">
          Supported: <code>.pdf</code> (Max: 10MB)
        </p>

        {/* Uploaded PDFs */}
        <section className="  text-left border-t border-gray-200 py-2 px-5">
          {" "}
          <h3 className="font-medium text-sm text-gray-700">
            Uploaded PDFs & Searchs:
          </h3>
          <ul className="text-sm text-gray-600 list-disc flex  pl-5 flex-col">
            {Recent?.map((list, idx) => {
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
        </section>
      </main>
    </div>
  );
};

export default DashHome;
