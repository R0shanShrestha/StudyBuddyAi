import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaEnvelope } from "react-icons/fa";
import { AuthContextProvider } from "../../context/AuthContext";
import { getItem } from "../../utils/LocalStorageManger";
const Login = () => {
  const { login, isLogged } = useContext(AuthContextProvider);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navto = useNavigate();

  useEffect(() => {
    const token = getItem("authtoken") || document.cookie.authtoken;
    if (token) {
      navto("/dashboard");
    }
  }, [isLogged]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email == "" || password == "") {
      alert("All Field Required");
    } else {
      login({ email, password });
    }
  };

  return (
    <div className="w-[70vw] mx-auto   flex items-center justify-center h-[70vh]">
      {/* Login Box */}
      <div className="bg-white border border-gray-200 shadow-xl p-8 rounded-xl max-w-sm w-full text-center animate-fade-in-up">
        <h2 className="text-xl font-semibold mb-1">
          StudyBuddy <span className="text-pink-500">AI</span>
        </h2>
        <p className="text-sm text-gray-500 mb-6">Your AI-powered study tool</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex items-center bg-gray-50 border-slate-300 border rounded px-3 py-2">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent p-2 w-full outline-none text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center bg-gray-50 border-slate-300 border rounded px-3 py-2">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent p-2 w-full outline-none text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="text-right text-xs text-gray-500 hover:text-pink-500 cursor-pointer">
            Forgot password?
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Log In
          </button>
        </form>

        <div className="border-t border-gray-200 mt-6 pt-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-pink-500 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
