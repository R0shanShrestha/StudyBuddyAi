import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import "./App.css";
const App = () => {
  return (
    <div className="min-h-screen relative bg-white text-gray-800 px-4 py-8 md:px-12 lg:px-24 transition-all duration-300 ease-in-out ">
      {/* Header */}
      <Navbar />
      {/* Homepage */}
      <Outlet />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
