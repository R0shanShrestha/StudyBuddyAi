import React, { useContext, useEffect, useState } from "react";
import Flashcard from "../../components/Flashcard";
import Quizcard from "../../components/Quizcard";
import SummaryCard from "../../components/SummaryCard";
import { UserContextProvider } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

const Result = () => {
  const { Result } = useContext(UserContextProvider);
  const [selTab, setTab] = useState("summery");
  const navto = useNavigate();
  useEffect(() => {
    if (Result == "") {
      navto("/dashboard/user");
    }
  }, []);
  return (
    <div className="sm:w-[70vw] mx-auto ">
      <div className="max-w-3xl mx-auto  bg-white rounded-lg p-6 shadow">
        <div className="flex  gap-2 items-center">
          ← Back to
          <Link
            to={"/dashboard"}
            className="text-sm text-blue-600 hover:underline"
          >
            Dashboard
          </Link>
          /
          <Link
            to={"/dashboard/user"}
            className="text-sm text-blue-600 hover:underline"
          >
            Account
          </Link>
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          {Result?.title}
        </h2>

        {/* Nav Tabs */}
        <div className="mt-4 flex space-x-4 border-b pb-2 text-sm text-gray-600">
          <button
            onClick={() => {
              setTab("summery");
            }}
            className="hover:text-black"
          >
            View Summary
          </button>
          <span>|</span>
          <button
            onClick={() => {
              setTab("flashcards");
            }}
            className="hover:text-black"
          >
            Flashcards
          </button>
          <span>|</span>
          <button
            onClick={() => {
              setTab("quiz");
            }}
            className="hover:text-black"
          >
            Quiz
          </button>
        </div>

        <div className=" w-full">
          {/*  Content */}
          {selTab == "summery" && (
            <SummaryCard
              Summary1={Result?.data?.summary[0]}
              Summary2={Result?.data?.summary[1]}
              title={Result?.data?.title}
              bigImg={
                "https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg"
              }
              smallImg={
                "https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg"
              }
            />
          )}
          {selTab == "quiz" && <Quizcard Mcq={Result?.data?.mcqs} />}
          {selTab == "flashcards" && (
            <Flashcard Flashcard={Result?.data?.flashcards} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;
