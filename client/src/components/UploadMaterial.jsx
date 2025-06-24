import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserContextProvider } from "../context/UserContext";

const UploadMaterial = () => {
  const { setLoading, isloading, setUploadMaterial, pdfGenerator } =
    useContext(UserContextProvider);
  const [fileName, setFileName] = useState("");
  const [uploaded, setUploaded] = useState(false);

  // console.log(fileName)

  const handleFileChange = (e) => {
    e.preventDefault();

    if (fileName.type == "application/pdf" && fileName.size < 10024) {
      pdfGenerator(fileName);
      setFileName("");
      setUploadMaterial(false);
    } else {
      setFileName("");
      setUploaded(false);
      alert("Only pdf accepted & file size will be less then 10 mb");
    }
  };

  return (
    <div className=" bg-white  left-0 h-fit      flex flex-col items-center justify-between py-6 px-4">
      {/* Upload Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="bg-white max-w-md w-full shadow-md rounded-xl p-6 border border-pink-100"
      >
        <h2 className="text-lg font-semibold mb-4">
          📄 Upload Your Study Material
        </h2>

        {!uploaded && (
          <div className="mb-4 flex gap-2 items-center">
            <form method="post" encType="multipart/form-data">
              <input
                id="file-upload"
                name="userfile"
                type="file"
                className="hidden"
                onChange={(e) => {
                  setUploaded(true);
                  setFileName(e.target.files[0]);
                }}
              />
              <label
                htmlFor="file-upload"
                className="inline-block cursor-pointer px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition text-sm"
              >
                Browse Your Files
              </label>
            </form>
            <div>
              <button
                onClick={() => {
                  setUploadMaterial(false);
                }}
                className="border border-slate-400 py-2 px-3 rounded text-sm"
              >
                Close Upload
              </button>
            </div>
          </div>
        )}
        {uploaded && (
          <div className="text-sm text-gray-700 mt-2 mb-4">
            <p>
              ✅ Selected File:{" "}
              <span className="font-medium">{fileName.name}</span>
            </p>
          </div>
        )}

        <div className="text-sm text-gray-500 border-t pt-4 mt-4">
          📌 Please make sure your PDF is clear & text-based.
        </div>

        <div className="mt-4 text-sm text-gray-700">
          <p className="font-medium mb-1">✅ We will extract your data:</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Summary</li>
            <li>Flashcards</li>
            <li>Quiz Questions</li>
          </ul>
        </div>
        {uploaded && (
          <div className="flex flex-col m-2 text-sm text-gray-500 border-t pt-4 mt-4 gap-3">
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  handleFileChange(e);
                }}
                className="inline-block cursor-pointer px-4 py-2 bg-slate-800 text-white rounded hover:bg-gray-950 transition text-sm"
              >
                Submit Now
              </button>
              <button
                onClick={() => {
                  setUploaded(false);
                  setFileName("");
                }}
                className="inline-block cursor-pointer px-4 py-2 bg-transparent border hover:text-white rounded hover:bg-gray-950 transition text-sm"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default UploadMaterial;
