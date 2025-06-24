import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserContextProvider } from "../../context/UserContext";
import UploadMaterial from "../../components/UploadMaterial";
import Loading from "../../components/Loading";
import Result from "./Result";
const Dashboard = () => {
  const { isUploadMaterial, isloading } = useContext(UserContextProvider);
  return (
    <div className="flex items-center justify-center     w-[70vw] mx-auto ">
      <div className={`${isloading ? "hidden" : "block"}  ${isUploadMaterial ? "hidden" : "block"}   lg:hidden w-fit`}>
        <Outlet />
      </div>
      <div className={`hidden lg:block `}>
        <Outlet />
      </div>
      {isloading ? <Loading /> : isUploadMaterial && <UploadMaterial />}
      {/* <Result/> */}
    </div>
  );
};

export default Dashboard;
