import React, { useContext, useEffect } from "react";
import { AuthContextProvider } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getItem } from "../../utils/LocalStorageManger";

const AuthWrapper = ({ children }) => {
  const { setLogged, setUser } = useContext(AuthContextProvider);
  const navto = useNavigate();
  useEffect(() => {
    const token = getItem("authtoken") || document.cookie.authtoken;
    const getUser = JSON.parse(getItem("user"));
    if (token) {
      setLogged(true);
      setUser((pre) => (pre = getUser));
    } else {
      navto("/login");
    }
  }, []);
  return children;
};

export default AuthWrapper;
