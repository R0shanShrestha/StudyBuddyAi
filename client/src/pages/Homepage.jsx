import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getItem } from "../utils/LocalStorageManger";

const Homepage = () => {
  const navto = useNavigate();
  useEffect(() => {
    const token = getItem("authtoken");
    if (token) {
      navto("/dashboard");
    }
  }, []);
  return (
    <div className="max-w-[70vw] mx-auto ">
      {/* Hero Section */}
      <div className="   grid md:grid-cols-2 items-center gap-8 mb-20">
        <div className="text-center md:text-left animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Smart PDF Study Buddy
          </h2>
          <p className="text-base md:text-lg mb-6">
            Effortlessly study smarter with AI: turning PDFs into your study
            companion.
          </p>
          <Link
            to={"/dashboard"}
            className="bg-gray-800 text-white px-6 py-2 rounded-full text-sm md:text-base hover:bg-gray-700 transition duration-300 shadow-md hover:shadow-lg"
          >
            GET STARTED
          </Link>
        </div>
        <div className="flex justify-center">
          <img
            src="https://theacademic.com/wp-content/uploads/2023/09/neliti_AI_in_teaching_and_learning_4K_ultrarestics_28f38230-ca84-411c-ad90-af1e1000e1b4.png"
            alt="AI Study"
            className="rounded-xl w-full max-w-[260px] sm:max-w-[300px] md:max-w-[360px] transform transition duration-500 hover:scale-105 shadow-xl hover:shadow-2xl"
          />
        </div>
      </div>

      {/* What You’ll Get */}
      <div className="text-center mb-32 px-2">
        <h3 className="text-lg md:text-xl font-semibold mb-6">
          What you’ll get ?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="hover:bg-gray-50 rounded-lg p-4 transition duration-300">
            <p className="text-xl md:text-2xl">📄 Summary</p>
            <p className="text-sm md:text-base text-gray-600">
              Quick overview of the important content
            </p>
          </div>
          <div className="hover:bg-gray-50 rounded-lg p-4 transition duration-300">
            <p className="text-xl md:text-2xl">🧠 Flashcards</p>
            <p className="text-sm md:text-base text-gray-600">
              → Learn faster with key terms and concepts
            </p>
          </div>
          <div className="hover:bg-gray-50 rounded-lg p-4 transition duration-300">
            <p className="text-xl md:text-2xl">❓ Quiz Questions</p>
            <p className="text-sm md:text-base text-gray-600">
              → Test your understanding with MCQs
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="text-center mb-32 px-2">
        <h3 className="text-lg md:text-xl font-semibold mb-6">
          🌟 How It Works
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="hover:bg-gray-50 rounded-lg p-4 transition duration-300">
            <p className="text-xl md:text-2xl">📄 Upload PDF</p>
            <p className="text-sm md:text-base text-gray-600">
              Select a chapter, book, or any PDF file
            </p>
          </div>
          <div className="hover:bg-gray-50 rounded-lg p-4 transition duration-300">
            <p className="text-xl md:text-2xl">🌐 AI Processes It</p>
            <p className="text-sm md:text-base text-gray-600">
              Summary, flashcards, and quizzes are generated
            </p>
          </div>
          <div className="hover:bg-gray-50 rounded-lg p-4 transition duration-300">
            <p className="text-xl md:text-2xl">🎓 Start Studying</p>
            <p className="text-sm md:text-base text-gray-600">
              Learn using your personalized study tools
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}

      <div className="text-center mb-16 animate-fade-in-up">
        <h4 className="text-xl font-semibold mb-2">
          Unlock smarter learning today
        </h4>
        <p className="mb-4 text-sm md:text-base text-gray-600">
          Join 1,000+ students boosting productivity with AI
        </p>
        <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full text-sm font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
          Upload Your PDF
        </button>
      </div>
    </div>
  );
};

export default Homepage;
