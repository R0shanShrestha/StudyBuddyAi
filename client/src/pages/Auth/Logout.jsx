import React, { useContext, useEffect } from "react";
import { AuthContextProvider } from "../../context/AuthContext";
import { removeItem } from "../../utils/LocalStorageManger";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { setLogged, setUser } = useContext(AuthContextProvider);
  const navto = useNavigate();
  useEffect(() => {
    setLogged(false);
    setUser("");
    removeItem(["user", "authtoken"]);
    alert("User Log out");
    navto("/login");
  }, []);
  return <div>Logout</div>;
};

export default Logout;
