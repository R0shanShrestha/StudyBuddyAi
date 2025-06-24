import React, { useEffect, useState } from "react";

const Quizcard = ({ Mcq }) => {
  // const question = Mcq;
  const [checked, setChecked] = useState([]);
  const [show, setShow] = useState({
    solvedQuestion: false,
    unSolvedQuestion: true,
  });
  const [solvedQuestion, setSolvedQuestion] = useState(new Set([]));
  const [unSolvedQuestion, setUnsolvedQuestion] = useState(Mcq);
  const [correctAnswerofQuestion, setcorrectAnswerofQuestion] = useState(
    new Set([])
  );

  // check the answer is correct if it than inc by 1 as the correct ans
  const AnswerCorrectionAndCorrectCountHandler = () => {
    // console.log(solvedQuestion);
    Array.from(solvedQuestion).map((q) => {
      q?.correct == true &&
        setcorrectAnswerofQuestion((pre) => {
          let newSet = new Set(pre).add(q);
          return newSet;
        });
    });
  };

  // filter the question already solve

  return (
    <div className=" px-4 py-10 flex justify-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-2">Biology Chapter 1 Quiz</h2>
        <p className="text-sm">
          You cannot Undo your Answer ! <br />
          Think Before Check !
        </p>
        <p className="text-sm mb-6 border-t flex justify-between">
          <span>Total Questions: {Mcq.length}</span>
          <span>
            Correct Answer: {Array.from(correctAnswerofQuestion).length}
          </span>
        </p>
        {show.unSolvedQuestion == true && unSolvedQuestion != ""
          ? unSolvedQuestion?.map((q, idx) => (
              <div key={idx} className="mb-6">
                <p className="font-medium">
                  {idx + 1}. {q.question}
                </p>
                <div className="mt-2 space-y-2">
                  {q.options.map((opt, i) => (
                    <label
                      key={i}
                      className={` ${
                        checked.includes(q.correct_answer) ? "hidden" : "block"
                      } `}
                    >
                      <input
                        onChange={(e) => {
                          setChecked((pre) => [q.correct_answer, ...pre]);
                        }}
                        type="checkbox"
                        onClick={() => {
                          setSolvedQuestion((pre) => {
                            let newSet = new Set(pre).add({
                              question: q.question,
                              myAnswer: opt,
                              correct: opt == q.correct_answer ? true : false,
                              msg:
                                opt == q.correct_answer
                                  ? "Correct Answer"
                                  : "Wrong Answer",
                              ans: q.correct_answer,
                            });
                            return newSet;
                          });
                        }}
                        name={`q${idx}`}
                        className={`mr-2 `}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            ))
          : !show.solvedQuestion &&
            solvedQuestion != " " && (
              <div className="mb-6">
                <p className="font-medium">
                  You have completed all of the quiz questions.
                </p>
                <div className="mt-2 space-y-2">
                  <label className="block">
                    ✅ Please Checked them All Question Answered. 📤
                  </label>
                </div>
              </div>
            )}

        {/* Checking the storedans is empty or not  */}
        {show.solvedQuestion && Array.from(solvedQuestion) != "" && (
          <>
            <div className="mb-6 border-b">
              <p className="font-medium">
                You have Solved {Array.from(correctAnswerofQuestion).length} out
                of {Mcq.length}.
              </p>
              <div className="mt-2 space-y-2">
                <label className="block">
                  ✅ Please Checked them All Question Answered. 📤
                </label>
              </div>
            </div>
            {Array.from(solvedQuestion)?.map((q, idx) => (
              <div key={idx} className="mb-6">
                <p className="font-medium">
                  {idx + 1}. {q.question}
                </p>
                <div className="mt-2 space-y-2">
                  <label className="block mx-4">
                    {q.correct
                      ? `${q.ans} is ${q.msg} ✔️ `
                      : `${q.myAnswer} is ${q.msg} ❌ \n Correct Answer is ${q.ans} ✔️ `}
                  </label>
                </div>
              </div>
            ))}
          </>
        )}

        {/* if show is true but solvedQuestion is empty */}
        {show.solvedQuestion && Array.from(solvedQuestion) == "" && (
          <div className="mb-6">
            <p className="font-medium">
              ⚠️ You haven't completed any of the quiz questions.
            </p>
            <div className="mt-2 space-y-2">
              <label className="block">
                ✅ Please finish them all and resubmit. 📤
              </label>
            </div>
          </div>
        )}

        <div className="flex">
          {show.solvedQuestion && (
            <button
              onClick={() => {
                setShow({
                  solvedQuestion: false,
                  unSolvedQuestion: true,
                });
                AnswerCorrectionAndCorrectCountHandler();
              }}
              className={`bg-black text-white px-6 py-2 rounded-full ${"flex"}`}
            >
              Back to Question
            </button>
          )}
          {!show.solvedQuestion && (
            <button
              onClick={() => {
                setShow({
                  solvedQuestion: true,
                  unSolvedQuestion: false,
                });
                AnswerCorrectionAndCorrectCountHandler();
              }}
              className={`bg-black text-white px-6 py-2 rounded-full ${"flex"}`}
            >
              Check Submited
            </button>
          )}
          <button
            onClick={() => {
              // questionFilter();
              setUnsolvedQuestion(Mcq);
              setSolvedQuestion([]);
              setcorrectAnswerofQuestion([]);
              setChecked([]);
              setShow({
                solvedQuestion: false,
                unSolvedQuestion: true,
              });
            }}
            className={`bg-black text-white px-6 py-2 rounded-full ${"flex"}`}
          >
            {/* {show.solvedQuestion != false
              ? " Back to Questions"
              : " Reset Questions"} */}
            Reset Questions
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quizcard;
