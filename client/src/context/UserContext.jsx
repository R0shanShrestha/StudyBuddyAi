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
        data,
        {
          headers: {
            Authorization: getItem("authtoken"),
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
      alert(error?.response?.data?.msg);
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
      }}
    >
      {children}
    </UserContextProvider.Provider>
  );
};

export default UserContext;
