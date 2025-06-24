import axios from "axios";
import React, { createContext, useState } from "react";
import { conf } from "../config/ClientConfig";
import { getItem } from "../utils/LocalStorageManger";
import { useNavigate } from "react-router-dom";
export const UserContextProvider = createContext({
  isUploadMaterial: Boolean,
  isloading: Boolean,
  Result: [],
  Recent: [],
  submitResultData: [],
  setsubmitResultData: () => {},
  setRecent: () => {},
  setResult: () => {},
  setUploadMaterial: () => {},
  setLoading: () => {},
  generateData: () => {},
  pdfGenerator: () => {},
});
const UserContext = ({ children }) => {
  const [isUploadMaterial, setUploadMaterial] = useState(false);
  const [isloading, setLoading] = useState(false);
  const [Result, setResult] = useState([]);
  const [submitResultData, setsubmitResultData] = useState([]);
  const [Recent, setRecent] = useState([]);

  const generateData = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(
        conf.serverUri + "api/v1/ai/generate",
        JSON.stringify(data),
        {
          headers: {
            Authorization: getItem("authtoken"),
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(res);
      setLoading(false);
      alert("Question Created Successfully");
      // setResult(res?.data?.result);
      setRecent((pre) => [
        { title: data?.prompt, data: res?.data?.result },
        ...pre,
      ]);
    } catch (error) {
      setLoading(false);
      // console.log(error);
      // console.log(error)
      if (error?.response?.data?.msg) {
        alert(error?.response?.data?.msg);
      } else {
        alert(error?.message);
      }
    }
  };

  // Pdf generator
  const pdfGenerator = async (data) => {
    console.log("welcome to StudyBuddy");
    const formData = new FormData();
    formData.append("userfile", data);
    try {
      setLoading(true);
      const res = await axios.post(
        conf.serverUri + "api/v1/ai/upload/generate",
        formData,
        {
          headers: {
            Authorization: getItem("authtoken"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(res);
      setLoading(false);
      setResult(res?.data?.result);
      setRecent((pre) => [
        { title: res?.data?.title, data: res?.data?.result },
        ...pre,
      ]);
      // console.log(res)
      alert(res?.data?.msg);
      setUploadMaterial(false);
    } catch (error) {
      setUploadMaterial(false);
      setLoading(false);
      // console.log(error)
      if (error?.response?.data?.msg) {
        alert(error?.response?.data?.msg);
      } else {
        alert(error?.message);
      }
    }
  };

  return (
    <UserContextProvider.Provider
      value={{
        generateData,
        isUploadMaterial,
        setUploadMaterial,
        Recent,
        setLoading,
        isloading,
        Result,
        setResult,
        submitResultData,
        setsubmitResultData,
        setRecent,
        pdfGenerator,
      }}
    >
      {children}
    </UserContextProvider.Provider>
  );
};

export default UserContext;
