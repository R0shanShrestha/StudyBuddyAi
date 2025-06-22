import React, { createContext, useContext, useEffect, useState } from "react";
import { conf } from "../config/ClientConfig";
import axios from "axios";
import { getItem, setStorage } from "../utils/LocalStorageManger";
import { UserContextProvider } from "./UserContext";

export const AuthContextProvider = createContext({
  isLogged: Boolean,
  user: String,
  isLoading: Boolean,
  setLoading: () => {},
  setLogged: () => {},
  Signup: () => {},
  setUser: () => {},
  login: () => {},
});

const AuthContext = ({ children }) => {
  const { setResult } = useContext(UserContextProvider);
  const [isLogged, setLogged] = useState(false);
  const [user, setUser] = useState();
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState({ status: false, msg: "" });
  //
  useEffect(() => {
    const token = getItem("authtoken") || document.cookie.authtoken;
    const getUser = JSON.parse(getItem("user"));
    if (token) {
      setLogged(true);
      setUser((pre) => (pre = getUser));
    }
  }, []);

  // Login
  const login = async (data) => {
    try {
      setLoading(true);
      setError({ status: false, msg: "" });
      const res = await axios.post(
        `${conf.serverUri}api/v1/auth/login`,
        JSON.stringify(data),
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": conf.serverUri,
          },
        }
      );
      const resData = res.data;
      setStorage("authtoken", resData?.authtoken);
      setStorage("user", JSON.stringify(resData?.user));
      setUser(resData.user);
      setLogged(true);
      alert("User Logged In");
    } catch (error) {
      // console.log(error);
      setLoading(false);
      // setError({ status: true, msg: error?.response?.data?.msg });
      alert(error?.response?.data?.msg);
    }
  };

  // Sign up
  const Signup = async (data) => {
    try {
      setLoading(true);
      setError({ status: false, msg: "" });
      const res = await axios.post(
        `${conf.serverUri}api/v1/auth/signup`,
        JSON.stringify(data),
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": conf.serverUri,
          },
        }
      );
      const resData = res.data;
      setStorage("authtoken", resData?.authtoken);
      setStorage("user", JSON.stringify(resData?.user));
      setUser(resData.user);
      setLogged(true);
      alert("User Sign In");
    } catch (error) {
      if (typeof error?.response?.data?.msg == "object") {
        error?.response?.data?.msg?.map((msg) => {
          alert(msg.msg);
        });
      } else {
        alert(error?.response?.data?.msg);
      }
      setLoading(false);
      // setError({ status: true, msg: error?.response?.data.msg });
    }
  };
  return (
    <AuthContextProvider.Provider
      value={{ isLogged, setLogged, setUser, login, user, Signup, isLoading }}
    >
      {children}
    </AuthContextProvider.Provider>
  );
};

export default AuthContext;
